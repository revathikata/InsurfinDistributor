import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterServiceService } from '../services/register-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.css']
})
export class EditEmailComponent {
  emailForm!:FormGroup
  phonenumber: any;
  customerId: any;
  primaryEmail: any;
  // salariedEmailId: any;
  // email:any;


  constructor(private fb:FormBuilder,
    private registerService:RegisterServiceService,
    private router: Router , public sharedService :SharedService){}
  ngOnInit() {
    // this.phonenumber =JSON.parse(localStorage.getItem('customerPhonenumber') ?? '')
    // this.customerId =JSON.parse(localStorage.getItem('customerId') ?? '')
    
    this.emailForm=this.fb.group({
     email:["" ,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
    if(this.sharedService.getSalariedPrimaryEmail() != null){
      this.primaryEmail = this.sharedService.getSalariedPrimaryEmail()
    // console.log(this.primaryEmail, 'salaried');
    }
    else{
      this.primaryEmail = this.sharedService.getSelfPrimaryEmail()
    // console.log(this.primaryEmail, 'salaried');
    }
    this.emailForm.patchValue({
      email:this.primaryEmail
    })


    // this.emailupadte
  //  let primaryEmail

    // if(primaryEmail){
    //   this.emailForm.patchValue({
    //     email : this.primaryEmail

    //   })
    //  }
  }
  

  

  

  sendAgain(){
    // const data = {
    //   email: this.primaryEmail,
    //   phoneNumber: this.phonenumber
    // }
    // // const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
    // this.registerService.sendEmail(data, this.customerId).subscribe((res) => {
    //   // console.log(res);
    // });
  }
  verifyEmail(){
    // this.emailupadte()
    // const data = {
    //   email: this.emailForm.controls['email'].value,
    //   phoneNumber: this.phonenumber
    // }
    // this.registerService.sendEmail(data, this.customerId).subscribe((res:any) => {
    // });
  }
  // emailupadte(){
  //   this.registerService.updateEmail(this.customerId, this.emailForm.controls['email'].value).subscribe((res:any) =>{
  //   })
  // }
}
