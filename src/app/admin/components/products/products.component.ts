import { Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { Create_Product } from 'src/app/contracts/create_product';


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
   
  }
  @ViewChild(ListComponent) listComponent:ListComponent;
  createdProduct(createdProduct:Create_Product){
    this.listComponent.getProducts();
  }
}
