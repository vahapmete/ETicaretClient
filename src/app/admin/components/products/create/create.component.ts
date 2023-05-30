import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
 
  constructor(spinner:NgxSpinnerService, private productService:ProductService,private alertify:AlertifyService) {
    super(spinner)
  }
  
  ngOnInit():void{}
  


  @Output() createdProduct:EventEmitter<Create_Product>= new EventEmitter();
  

  create(name:HTMLInputElement,stock:HTMLInputElement, price:HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom)
    const product:Create_Product = new Create_Product();
    product.name=name.value;
    product.stock= parseInt(stock.value);
    product.price= parseFloat(price.value);

    this.productService.create(product,()=>{
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Product created successfuly.",{
        dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      });
      this.createdProduct.emit(product)
    },errorMessage=>{
      this.alertify.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      })
    });

  }
}
 