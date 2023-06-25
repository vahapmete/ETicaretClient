import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    GoogleSigninButtonModule,
    RouterModule.forChild([
      {path:"", component:LoginComponent}
    ]),
  ]
})
export class LoginModule { }
