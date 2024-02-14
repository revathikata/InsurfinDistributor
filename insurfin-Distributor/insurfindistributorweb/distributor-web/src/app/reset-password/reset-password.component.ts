import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { RegisterServiceService } from '../services/register-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 
  @ViewChild('ngxotp') ngxOtp: NgxOtpInputComponent;
  resetPasswordForm!: FormGroup;
  reset=true
  otpInputConfig :NgxOtpInputConfig = {
    otpLength: 6,
    autofocus :true,
    behavior:1, 
    autoblur:true,
    classList :{
      inputBox:'otps',
      input:'my-super-class',
      inputFilled:'my-super-filled-class',
      inputDisabled: 'my-super-disabled-class',
      inputSuccess:'my-super-success-class',
      inputError:'my-super-error-class'
    }
  }
  otpfill:any;
  setpassword:any;
  otp: any;
  // setps: boolean =false;
  message: any;
  isDisabled: boolean = true;
  errormessage: any;
  userId: any;
  timer: any;
  minutes: number = 1;
  seconds: number = 0;
  BtnDisable: boolean = false;
 
  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private registerService : RegisterServiceService,
    private authService: AuthServiceService
    
    )
    {
      // console.log(router.url)
    }
  ngOnInit(): void {
    //  if(this.router.url == '/setps-welcome'){

    //   this.setps = true; 
      
    // }else{
      
    //   this.setps = false
    //   }
    // let password = localStorage.getItem('resetPassword')

    // this.setps = localStorage.getItem('setpassword')
    this.resetPasswordForm=this.formBuilder.group({
      phoneNum:["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}?$|^((\\+91-? ?)|0)?[6-9]{1}[0-9]{9}$")]]
    })
    sessionStorage.removeItem('AccessToken2')
  }
  sendVerification(){
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    if (this.resetPasswordForm.valid) {
      const phone = this.resetPasswordForm.controls['phoneNum'].value;
     const data ={
        phoneNumber:phone,
        role :'DISTRIBUTOR',
      }
       this.authService.signUpwithPhoneNumber(data).subscribe({
        next: (res:any) =>{
        if(res?.error == false){
          this.reset=false;
          sessionStorage.setItem("AccessToken", JSON.stringify(res?.data.accessToken));
          this.userId = res?.data.uuid
          this.setExpireTimer()
        }
        else{
          this.errormessage = res?.message
        }
        sessionStorage.setItem('phoneNum',this.resetPasswordForm.controls['phoneNum'].value)
      },
      error:(err) => {
        this.errormessage = "No Active Internet Found, Please connect to active internet Connection."
      }
       })

    }
    else{
      alert("Enter Valid Details")
    }

  }
  handleOtp(ot:any){
    // if(parseInt(ot)== 123456){
    //  alert('success');
    // }
    // else{
    //  alert('your otp is wrong')
    // }
    this.otpfill = ot.join('').length == 6;
   }
   handleFill(value:any){
   this.otpfill = value;
   }

   buttonDisabled: boolean = false; //class variable
generateEmailOtp() {
    this.buttonDisabled = !this.buttonDisabled
    this.buttonDisabled=false;
  }

  resetKey(){
    this.reset=true
  }
  // otpValidContinue(){
  //   const data={
  //     phoneNumber: this.resetPasswordForm.controls['phoneNum'].value,
  //     otp: this.otpfill,
  //     uuid: this.userId,
  //     role: "DISTRIBUTOR"
  //   }
  //   this.authService.signUpPhoneOTP(data).subscribe((res:any) =>{
  //     if(res?.error === false){
  //     //  this.isDisabled = false
  //     //  console.log(this.message);
  //   // this.resetPasswordForm.invalid;
  //   sessionStorage.setItem("AccessToken2", JSON.stringify(res?.data.accessToken));
  //   sessionStorage.setItem("UserId", JSON.stringify(res?.data.uuid))
  //   this.router.navigate(['./setup-password'])
  //     }
  //     else{
  //       this.message = res.message
  //     }
      
  //     });
  // }
  otpValidContinue2(){
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    const data={
      phoneNumber: this.resetPasswordForm.controls['phoneNum'].value,
      otp: this.otpfill,
      uuid: this.userId,
      role: "DISTRIBUTOR"
    }
    this.authService.verifyPhoneOtp( data).subscribe({
      next:(res:any) =>{
      if(res?.error === false){
        sessionStorage.setItem("AccessToken2", JSON.stringify(res?.data.accessToken));
        sessionStorage.setItem("UserId", JSON.stringify(res?.data.uuid));
        sessionStorage.setItem("email", JSON.stringify(res?.data.email));
        sessionStorage.setItem('refreshToken',JSON.stringify(res?.data.refreshToken))
       this.router.navigate(['./enter-new-password'])
      //  this.isDisabled = false
      }
      else{
        this.message = res?.message
      }
    },
      error:(err) => {
        this.message = "No Active Internet Found, Please connect to active internet Connection."
      }
      });
  }

  isNumber(value: string): boolean {
    return !isNaN(Number(value));
  }
  sendAgain(){
    if (!this.isDisabled) {
      localStorage.removeItem('otp')
      this.ngxOtp.clear();
      this.sendVerification()
    }
    }

    setExpireTimer() {153
      this.timer && clearInterval(this.timer);
      this.minutes = 1;
      this.seconds = 0;
      this.isDisabled = true;
      this.timer = setInterval(() => {
        this.tick();
      }, 1000);
    }

    tick() {
      if (this.minutes <= 0 && this.seconds <= 0) {
        clearInterval(this.timer);
        this.isDisabled = false;
        // this.isValid =true    // if session expires redirecting to login page
        return;
      }
      if (--this.seconds < 0) {
        this.seconds = 59;
        this.minutes--;
      }
    }
  }
