import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-please-confirm-personal-details-popup',
  templateUrl: './please-confirm-personal-details-popup.component.html',
  styleUrls: ['./please-confirm-personal-details-popup.component.css']
})
export class PleaseConfirmPersonalDetailsPopupComponent {
constructor( private router: Router , private dialogRef: MatDialogRef<any>){}

ngOnInit(): void {

}
navigateToLogin(){
 this.router.navigate(['./login2'])
 this.dialogRef.close();
}
onCancel(){
  this.dialogRef.close();
}
}
