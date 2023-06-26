import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService:CustomToastrService,private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error=>{
      console.log(error);
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("You are not authorized.","Unauthorized!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopCenter
          });
          this.authService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data=>{});
          break; 
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Could not connect to server.","Server Error!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopCenter
          })
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Your request is not found.","Not found!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopCenter
          })
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Invalid operation made.","Invalid opertation!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopCenter
          })
          break;
        default:
          this.toastrService.message("Unexpected error throwed","Erro",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopCenter
          })
          break;
      }
      return of(error);
    }))
  }
}
