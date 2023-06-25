import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { Token } from '@angular/compiler';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService, private toastrService:CustomToastrService) { }

  async create(user:User):Promise<Create_User>{
    const observable:Observable<Create_User | User> = this.httpClientService.post<Create_User|User>({
      controller:"appusers",
    },user);
    return await firstValueFrom(observable) as Create_User;
  } 
  async login(usernameOrEmail:string, password:string,callBackFunction?:()=>void):Promise<void>{
    const observable:Observable<any| TokenResponse>= this.httpClientService.post<any|TokenResponse>({
      controller:"AppUsers",
      action:"login"
    },{usernameOrEmail,password})
    const tokenResponse:TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken)
      this.toastrService.message("Signed in successfuly!","Success",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }
  async googleLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
    const observable :Observable<SocialUser|TokenResponse>=this.httpClientService.post({
      controller:"appusers",
      action:"google-login"
    },user)
    const tokenResponse:TokenResponse=await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken)
      this.toastrService.message("Signed in with Google successfuly.","Signed in!",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
      callBackFunction();
    }
  }
}
