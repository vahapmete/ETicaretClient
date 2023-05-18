import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseComponent  {

  constructor(spinner: NgxSpinnerService) {
    super(spinner);
    
  }
  ngOnInit():void{
    this.showSpinner(SpinnerType.BallAtom)
  }

}
