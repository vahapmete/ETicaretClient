import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Position } from './services/admin/alertify.service';
import { Router } from '@angular/router';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Al-Sat-Kazan';

  /**
   *
   */
  constructor(public authService:AuthService,private toastrService:CustomToastrService,private router:Router) {
    authService.idendityCheck();
  }
  signOut(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken")
    this.authService.idendityCheck();
    this.router.navigate([""])
    this.toastrService.message("Signed out securely!","Signed out!",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
    })
  }
  
 


}


