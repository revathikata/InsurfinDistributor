import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { PleaseConfirmCustomerpopupComponent } from 'src/app/please-confirm-customerpopup/please-confirm-customerpopup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-delete-popup',
  templateUrl: './edit-delete-popup.component.html',
  styleUrls: ['./edit-delete-popup.component.css']
})
export class EditDeletePopupComponent {

constructor(private bottomsheet:MatBottomSheetRef<EditDeletePopupComponent>,private router:Router,private dialog:MatDialog){}
  close(){
    this.bottomsheet.dismiss()
  }
  editdetails(){
    this.router.navigate(["/new-customer"])
    this.bottomsheet.dismiss();
  }

  deletepraposal(){
    this.bottomsheet.dismiss();
  }
  deletecustomer(){
    this.dialog.open(PleaseConfirmCustomerpopupComponent)
  }
}
