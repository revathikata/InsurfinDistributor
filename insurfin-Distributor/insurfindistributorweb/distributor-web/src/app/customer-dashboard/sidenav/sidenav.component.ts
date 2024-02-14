import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignOutPopupComponent } from './sign-out-popup/sign-out-popup.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {


constructor( private router:Router,private dialog:MatDialog, private matDialog:MatDialogRef<SidenavComponent>){}

allCustomers(){
  // this.matDialog.close('yes')
  this.router.navigate(['./sorting-filtering'])
  this.matDialog.close()
  
}
home(){
  this.router.navigate(['/customer-dashboard'])
  this.matDialog.close()
}
signout(){
  this.matDialog.close()
 this.dialog.open(SignOutPopupComponent)
}
profile(){
  this.matDialog.close()
 this.router.navigate(['/profile'])
}

}
