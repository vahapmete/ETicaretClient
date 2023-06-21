import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './services/common/file-upload/file-upload.component';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=> localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7294"]
      }
    })
  ],
  providers: [
    {provide: "baseUrl",useValue:"https://localhost:7294/api",multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
