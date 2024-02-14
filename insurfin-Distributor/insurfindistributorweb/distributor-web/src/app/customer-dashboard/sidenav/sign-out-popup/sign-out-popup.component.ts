import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sign-out-popup',
  templateUrl: './sign-out-popup.component.html',
  styleUrls: ['./sign-out-popup.component.css']
})
export class SignOutPopupComponent {
  refersToken: any;

  constructor( private router:Router , private dialogRef : MatDialogRef<any>,
    private authService : AuthServiceService,){}

  signOut(){
    this.refersToken = JSON.parse(sessionStorage.getItem("refreshToken") ?? 'null');
    const data = {
      token: this.refersToken
    }
    this.authService.logout(data).subscribe((res:any) =>{
      this.router.navigate(['./login2'])
      sessionStorage.clear()
    });
  }
  closePopup(){
  this.dialogRef.close()
   
  }
}
