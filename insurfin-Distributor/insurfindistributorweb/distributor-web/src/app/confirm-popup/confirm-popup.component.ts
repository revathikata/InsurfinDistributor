import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent {
constructor(private router:Router,private dialogRef: MatDialogRef<any>,){}
  yesbtn(){
    this.router.navigate(['/new-customer'])
    this.dialogRef.close();
  }
}
