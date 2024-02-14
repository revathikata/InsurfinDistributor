import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
// import { NewCustomerComponent } from 'src/app/new-customer/new-customer.component';



@Component({
  selector: 'app-conform-popup',
  templateUrl: './conform-popup.component.html',
  styleUrls: ['./conform-popup.component.css']
})
export class ConformPopupComponent {

constructor( private router:Router , public sharedService : SharedService , private dialogRef: MatDialogRef<any>){}

navigateToLoansInProcess(){
  this.dialogRef.close('yes')
  // this.sharedService.setConformPopupNavigation('')
}

closePopUp(){
  this.dialogRef.close();
}

}
