import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-please-confirm-popup',
  templateUrl: './please-confirm-popup.component.html',
  styleUrls: ['./please-confirm-popup.component.css']
})
export class PleaseConfirmPopupComponent {

constructor(  private router:Router,private dialogRef: MatDialogRef<any>,){}
  

  navigateToKycStatus(){
   this.router.navigate(['./customer-details'])
   this.dialogRef.close();
  }
}
