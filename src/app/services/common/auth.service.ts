import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { HttpClientService } from './http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper:JwtHelperService,private httpClientService:HttpClientService, private toastrService:CustomToastrService) { }

  idendityCheck(){
    const token = localStorage.getItem("accessToken")
    
    let expired:boolean;
    try {
      expired=this.jwtHelper.isTokenExpired(token);
    } catch {
      expired= true;
    }
    _isAuthenticated=token!=null && !expired;
  
  }
  get isAuthenticated():boolean{
    return _isAuthenticated;
  }
  async login(usernameOrEmail:string, password:string,callBackFunction?:()=>void):Promise<void>{
    const observable:Observable<any| TokenResponse>= this.httpClientService.post<any|TokenResponse>({
      controller:"auth",
      action:"login"
    },{usernameOrEmail,password})
    const tokenResponse:TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken)
      this.toastrService.message("Signed in successfuly!","Success",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }
  async googleLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
    const observable :Observable<SocialUser|TokenResponse>=this.httpClientService.post({
      controller:"auth",
      action:"google-login"
    },user)
    const tokenResponse:TokenResponse=await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken)
      this.toastrService.message("Signed in with Google successfuly.","Signed in!",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
      callBackFunction();
    }
  }
  async refreshTokenLogin(refreshToken:string,callBackFunction?:()=>void):Promise<any>{
    const observable : Observable< any| TokenResponse> = this.httpClientService.post({
      controller:"auth",
      action:"refreshtokenlogin"
    },{refreshToken:refreshToken});
    const tokenResponse:TokenResponse=await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken",tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken)
    }
    callBackFunction();
  }
}
export let _isAuthenticated:boolean;