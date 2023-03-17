import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Product } from 'src/app/contracts/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent{

  constructor(spinner:NgxSpinnerService, private httpClientService:HttpClientService ) {
    super(spinner);
  }

  ngOnInit():void{
    this.showSpinner(SpinnerType.BallAtom)
    this.httpClientService.get<Product[]>({controller:"products"}).subscribe(data=>console.log(data));

    // this.httpClientService.post(
    //   {controller:"products"},
    //   {name:"Kalem",stock:100,price:16}
    // ).subscribe();

    // this.httpClientService.put({
    //   controller:"products"
    // },
    // { id:"c0dc52d7-bf23-49ef-89fc-b002057ede6e", 
    //   name:"Silgi",
    //   price:2.50,
    //   stock:6000
    // }).subscribe();
    
    // this.httpClientService.delete({
    //   controller:"products"
    // },
    // "c0dc52d7-bf23-49ef-89fc-b002057ede6e").subscribe();
  }
}
