import { HttpErrorResponse } from '@angular/common/http';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    public dialog: MatDialog
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', '../../../../assets/delete.png');
    img.setAttribute('style', 'cursor:pointer');
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onclick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallAtom);
      const td_element: HTMLTableCellElement = this.element.nativeElement;
      await this.httpClientService.delete({
      controller:this.controller
    },this.id).subscribe(data=>{
       $(td_element.parentElement).animate({
        opacity:0,
        left:'+=50',
        height:"toggle"
      },700,()=>{
        this.callback.emit();
        this.alertify.message("Product deleted successfuly!",{
          dismissOthers:true,
          messageType:MessageType.Success,
          position:Position.TopRight
        })
      })
    },(errorResponse:HttpErrorResponse)=>{
      this.spinner.hide(SpinnerType.BallAtom)
      this.alertify.message("Product could not be deleted!",{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      })
    });
     
    }); 
    // setTimeout(()=>this.spinner.hide(SpinnerType.BallAtom),1000);
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
