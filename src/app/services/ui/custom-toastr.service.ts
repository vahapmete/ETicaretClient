import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {
  
  constructor(private toastr:ToastrService) {}
  message(message:string, title:string,toastrOptions:Partial<ToastrOptions>){
    this.toastr[toastrOptions.messageType](message,title,{positionClass:toastrOptions.position}); 
  
  }
  
  
}
export class ToastrOptions{
  messageType:ToastrMessageType;
  position:ToastrPosition;
}
export enum ToastrMessageType{
  Success="success",
  Error="error",
  Warning="warning",
  Info="info"

} 
export enum ToastrPosition{
  TopRight='toast-top-right',
  TopLeft='toast-top-left',
  TopCenter='toast-top-Center',
  TopFullWidth='toast-top-full-width',
  BottomFullWidth='toast-bottom-full-width',
  BottomLeft='toast-bottom-left',
  BottomRight='toast-bottom-right',
  BottomCenter='toast-bottom-center',
}
