import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    FileUploadDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,MatButtonModule
    
  ]
})
export class DialogModule { }
