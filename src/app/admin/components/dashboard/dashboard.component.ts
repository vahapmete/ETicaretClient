import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent{

  constructor(spinner:NgxSpinnerService,private signalRService:SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.ProductHub)
  }

  ngOnInit():void{
    this.showSpinner(SpinnerType.BallAtom);
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction,message =>{
      alert(message)
    })
  }
}
