import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-setup-password',
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.css']
})

export class SetupPasswordComponent {

  SignupFormgroup!:FormGroup
  hidePassword = true;
  showPassword = true
  email : any;
  role : any
  otpfill: boolean;
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
  isDisabled: boolean = true;
  timer: any;
  minutes: number;
  seconds: number;
  signUpOtpPage : boolean = false
  getuserId: any;
  getEmail: any;
  emailDisabed:boolean=true;
  errorMessage: any;
  constructor(
    private fb:FormBuilder,
    private registerServic: RegisterServiceService,private router: Router, private authService: AuthServiceService,) { }
    ngOnInit(): void { 
      this.getEmail = JSON.parse(sessionStorage.getItem('setEmail') ?? 'null');
      this.SignupFormgroup = this.fb.group({
        email:[{value:this.getEmail, disabled:this.emailDisabed}],
        enterpassword: ["", [Validators.required, this.passwordValidator(),]],
        repassword: ["",Validators.required]
  
      },
      { validators: this.matchpassword });
  
    }
    passwordValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z]).{8,15}$/;
        const valid = passwordPattern.test(control.value);
        return valid ? null : { invalidPassword: true };
      };
    }
  
    matchpassword(SetupFormgroup: FormGroup) {
      return SetupFormgroup.controls['enterpassword'].value && SetupFormgroup.controls
      ['enterpassword'].value === SetupFormgroup.controls['repassword'].value ? SetupFormgroup.controls
      ['repassword'].setErrors(null) : SetupFormgroup.controls['repassword'].setErrors({ 'misMatch':true})
  }
    togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword;
    }
    PasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
    handleOtp(ot: any) {
      if (parseInt(ot) == 123456) {
      }
      else {
      }
      this.otpfill = ot.join('').length == 6;
    }
    handleFill(value: any) {
        this.otpfill = value;
      // this.otpfill = ot.join('').length == 6;
  
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
    signupBtn(){
      
      this.signUpOtpPage = true
    }
    signupContinue(){
      this.getuserId= JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
      const data = {
        uuid : this.getuserId,
        password : this.SignupFormgroup.controls['repassword'].value
      }
      this.authService.setUpPassword(data).subscribe((res: any) => {
if(res?.error == false){
  this.router.navigate(['./customer-dashboard'])
}
else{
  this.errorMessage = res?.message
}
      });
      

    }
    sendAgain() {
      if (!this.isDisabled) {
        this.signupBtn()
      }
    }
    loginWithMobile(){
      this.router.navigate(['./login'])
    }

    OnClick(){
      this.router.navigate(['/registersuccess'])
    }
}
