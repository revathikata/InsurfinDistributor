import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-email-validation-page',
  templateUrl: './email-validation-page.component.html',
  styleUrls: ['./email-validation-page.component.css']
})
export class EmailValidationPageComponent {
  EmailValidation! : FormGroup;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    // behavior: 1,
    classList: {
      inputBox: 'otps',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disabled-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class'
    }
    
  }
  otpfill: any;
  isValid = true
  isDisabled: boolean = true;
  timer: any;
  minutes: number = 1;
  seconds: number = 0;
  userId: string | null;
  errorCodeMsg = '';
  userEmail: any;
  OtpErrorCodeMsg: any;
  constructor(private formBuilder: FormBuilder,private authService: AuthServiceService,private router: Router){}

  ngOnInit(): void {
    this.clearErrorMessage()
  this.EmailValidation = this.formBuilder.group({
    email:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  });
}
navigationtoMobileNumber() {
  this.isValid = true
}
showInitialAuthSection() {
  this.isValid = true;
}
sendAgain() {
  if (!this.isDisabled) {
    this.emailContinue()
  }
}
handleOtp(ot: any) {
  this.otpfill = ot.join('').length == 6;
}
handleFill(value: any) {
  this.otpfill = value;
}
clearErrorMessage() {
  if (this.errorCodeMsg) {
    this.errorCodeMsg = '';
    this.EmailValidation.controls['email'].setErrors(null);
  }
}
emailContinue() {
  this.errorCodeMsg = ''
  this.userId = JSON.parse(sessionStorage.getItem("UserId") ?? 'null');
  const data = {
      email : this.EmailValidation.controls['email'].value,
      otp : this.otpfill,
      uuid : this.userId,
      role : "DISTRIBUTOR"
    
  }
  this.authService.signupEmail(data).subscribe((res:any) => {
    this.userEmail=res?.data?.email
    if(res?.error == false){
      sessionStorage.setItem('setEmail',JSON.stringify(data.email))
      this.isValid = false
      this.setExpireTimer()
    }
    else{
     this.errorCodeMsg = res?.message
    }
  });
}
EmailOtpValid(){
  this.OtpErrorCodeMsg = ''
  const data = {
    otp : this.otpfill,
    role : "DISTRIBUTOR"
}
  this.authService.EmailOtpVerify(data).subscribe((res:any) => {
    if(res?.error == false){
      // sessionStorage.removeItem("AccessToken2");
      this.router.navigate(['./terms-conditions'])
    }
    else{
     this.OtpErrorCodeMsg = res?.message
    }
  });
}

setExpireTimer() {
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
