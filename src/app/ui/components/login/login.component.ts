import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService, private activatedRoute:ActivatedRoute,private router:Router,
    private authService:AuthService,private socialAuthService:SocialAuthService){

    super(spinner)
    socialAuthService.authState.subscribe(async (user:SocialUser)=>{
      this.showSpinner(SpinnerType.BallAtom)
      await authService.googleLogin(user,()=>{
        this.authService.idendityCheck();
        this.hideSpinner(SpinnerType.BallAtom)
      })
    })
      
  }


  ngOnInit(): void {
  }
    
  async login(usernameOrEmail:string,password:string){
    this.showSpinner(SpinnerType.BallAtom)
    await this.authService.login(usernameOrEmail,password,()=>{
      this.authService.idendityCheck();
      this.activatedRoute.queryParams.subscribe(params=>{
        const returnUrl:string = params["returnUrl"];
        if(returnUrl){
          this.router.navigate([returnUrl])
        }
      })
      this.hideSpinner(SpinnerType.BallAtom);
    })
  }

}
