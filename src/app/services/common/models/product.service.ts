import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from '../http-client.service';
import { List_Product } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }
  
  create(product:Create_Product, successCallBack?:()=> void, errorCallBack?:(errorMessage:string)=> void){
    this.httpClientService.post({
      controller:"products"
    },
      product).subscribe(result=>{
        successCallBack()  
      },(errorResponse:HttpErrorResponse)=> {
        const _error : Array<{key:string, value:Array<string>}>= errorResponse.error;
        let message = "";
        _error.forEach((v,index)=>{
          v.value.forEach((_v,_index)=>{
            message+=`${_v}<br>`;
          });
        });
        errorCallBack(message)
      });
  }

  async getProductList(page:number=0,size:number=5, successCallBack?:()=> void, errorCallBack?:(errorMessage:string)=> void ):Promise<{totalCount:number;products:List_Product[]}>{
    const promiseData:Promise<{totalCount:number;products:List_Product[]}>= this.httpClientService.get<{totalCount:number;products:List_Product[]}>({
      controller:"products",
      queryString:`page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d=> successCallBack())
      .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

    return await promiseData;
  }
  async delete(id:string){
    const deleteObservable:Observable<any>=this.httpClientService.delete<any>({
      controller:"products"
    },id);
    await firstValueFrom(deleteObservable);
  }
  
   async readImages(id:string,successCallBack?:()=>void):Promise<List_Product_Image[]>{
    const getObservable:Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action:"getproductimages",
      controller:"products",
      queryString:`id=${id}`

    });
    const images:List_Product_Image[]=await firstValueFrom(getObservable);
    successCallBack();
    return images;
   }
   async deleteImage(productId:string,imageId:string,successCallBack:()=>void){
    const deleteObservable= await this.httpClientService.delete({
      action:"deleteProductImage",
      controller:"products",
      queryString:`imageId=${imageId}`
    },productId);
    await firstValueFrom(deleteObservable);
    successCallBack();
   }

}
