import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterServiceService } from '../services/register-service.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../services/shared.service';
import { SuccessPopupComponent } from '../customer-details/success-popup/success-popup.component';

@Component({
  selector: 'app-verify-email-popup',
  templateUrl: './verify-email-popup.component.html',
  styleUrls: ['./verify-email-popup.component.css']
})
export class VerifyEmailPopupComponent implements OnInit {

  emailForm!:FormGroup
  primaryEmail: any;
  phonenumber: any;
  uuid: any;
  error: any;
  salariedEmailId: any;
  errorMsg = '';

  constructor(private fb:FormBuilder,
   private registerService:RegisterServiceService,
   private router: Router,private dialogRef : MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public userData: any,
   private sharedService : SharedService , private dialog: MatDialog){}
  ngOnInit(): void {
    if (sessionStorage.getItem('primaryEmail') != null) {
      this.primaryEmail =JSON.parse(sessionStorage.getItem('primaryEmail') ?? '')
    }
    else{
      // this.primaryEmail =JSON.parse(localStorage.getItem('selfprimaryEmail') ?? '')
    }
    // if(this.sharedService.getSalariedPrimaryEmail() != null){
    //   this.primaryEmail = this.sharedService.getSalariedPrimaryEmail();
    //   this.primaryEmail = this.sharedService.getSelfPrimaryEmail()
    // // console.log(this.salariedEmailId, 'salaried');
    // }
    // else{
    //   this.primaryEmail = this.userData.email
    // // console.log(this.salariedEmailId, 'salaried');
    // }
    // this.phonenumber =JSON.parse(localStorage.getItem('customerPhonenumber') ?? '')
    // this.customerId =JSON.parse(localStorage.getItem('customerId') ?? '')
    this.emailForm=this.fb.group({
     email:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
    // this.emailupadte
  }
  sendAgain(){
    // const data = {
    //   email: this.userData.email,
    //   phoneNumber: this.userData.phoneNumber
    // }
    this.uuid = JSON.parse(sessionStorage.getItem('customerUuid') ?? 'null');
    this.registerService.sendCustomerEmail(this.uuid).subscribe((res:any) => {
      if(res?.error == false){
        this.dialogRef.close()
        this.dialog.open(SuccessPopupComponent,{data:'verifyEmail'})  
      }
      else{
        this.errorMsg = res?.message
      }
    });
  }
  // sendEmailSalaried() {
  //   const data = {
  //     email: this.salaryEmploymentForm.controls['pemail'].value,
  //     phoneNumber: this.customerInfoForm.controls['phnnum'].value
  //   }
  //   // const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
  //   this.registerService.sendEmail(data, this.customerId).subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  // verifyEmail(){
  //   this.emailupadte()
  //   const data = {
  //     email: this.emailForm.controls['email'].value,
  //     phoneNumber: this.phonenumber
  //   }
  //   this.registerService.sendEmail(data, this.customerId).subscribe((res:any) => {
     
  //   });
  // }
    // this.router.navigate(['./verify-email',{queryParamsHandling: 'preserve'}])
// emailupadte(){
//   this.registerService.updateEmail(this.uuid, this.emailForm.controls['email'].value).subscribe((res:any) =>{
    
//   })
// }

editEmail(){ 
  this.router.navigate(['/edit-email'])
  this.dialogRef.close()
}

}
