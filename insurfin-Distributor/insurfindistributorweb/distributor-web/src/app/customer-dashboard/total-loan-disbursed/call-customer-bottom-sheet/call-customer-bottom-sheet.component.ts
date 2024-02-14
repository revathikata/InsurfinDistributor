import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-call-customer-bottom-sheet',
  templateUrl: './call-customer-bottom-sheet.component.html',
  styleUrls: ['./call-customer-bottom-sheet.component.css']
})
export class CallCustomerBottomSheetComponent {

  constructor(private bottomsheet:MatBottomSheet){}
  callCustomer() {
    window.location.href = 'tel:+1234567890';
  }
  close(){
    this.bottomsheet.dismiss()
  }
}
