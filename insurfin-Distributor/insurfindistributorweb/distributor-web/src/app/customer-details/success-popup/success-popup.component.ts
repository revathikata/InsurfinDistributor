import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css']
})
export class SuccessPopupComponent {
  constructor(private router:Router ,private dialogRef : MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any ){}

ngOnInit(): void {
}

  navigateToCustomerDetails(){
    this.dialogRef.close()
    this.router.navigate[('/customer-details')]

  }
}
