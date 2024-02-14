import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { RegisterServiceService } from '../services/register-service.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-mobile-number',
  templateUrl: './mobile-number.component.html',
  styleUrls: ['./mobile-number.component.css']
})
export class MobileNumberComponent implements OnInit {

  otpForm!: FormGroup
  form!: FormGroup
  // email! :FormGroup
  isValid = true
  email: any;
  password: any;
  loginForm!: FormGroup;
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
  message: any;
  emailwrong: any;
  ApprovalStatus: any;
  error: any;
  errorMessage = '';
  loginWithotp: boolean = true;
  getdistributorId: any;
  timer: any;
  optSendMessage:any;
  minutes: number = 1;
  seconds: number = 0;
  phonenumber: any;
  isDisabled: boolean = true;
  signUp: boolean = false;
  mobileVerifiedpage: boolean = false;
  otpInputBorderColor: string = '';
  isLoginWithMobileNumber: any;
  userSignUp: boolean;
  signUpAccessToken: any;
  uuid: any;
  errorCodeMsg: any;
  serverErr: string;
  BtnDisable: boolean = false;

  // @ViewChild('ngOtpInput') ngOtpInputRef:any;
  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    private http: HttpClient, private router: Router, private authService: AuthServiceService,
    private registerServic: RegisterServiceService, private activeRoute: ActivatedRoute) { }

  isNumber(value: string): boolean {
    return !isNaN(Number(value));
  }

  ngOnInit(): void {
    if (this.router.url == '/sign-up') {

      this.signUp = true;

    } else {

      this.signUp = false
    }
    this.loginForm = this.formBuilder.group({
      // email:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phnnum: ["", [Validators.required, Validators.pattern("^(\\+91-? ?)?[6-9][0-9]{9}$")]],
      // fullName: ["", [Validators.required, Validators.pattern("^\\S.[a-zA-Z_ ]*$")]],
      name: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]]


      // usertype:[, Validators.required]
    });

    sessionStorage.clear();
    this.activeRoute.queryParams.subscribe(userSignUpp => {
      this.userSignUp = userSignUpp['userSignUp']
    })
  }


  isEmail(search: string): boolean {
    var serchfind: boolean;
    var regexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    serchfind = regexp.test(search);
    // console.log(serchfind)
    return serchfind
  }
  isPhonenumber(search: string): boolean {
    var serchfind: boolean;
    var regexp = new RegExp('^((\\+91-? ?)|0)?[6-9]{1}[0-9]{9}$');
    serchfind = regexp.test(search);
    // console.log(serchfind)
    return serchfind
  }
  isPhnnumValid() {
    return this.loginForm.get("phnnum")?.valid;
  }

  contnw() {
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    // this.spinner.show();
    const data = {
      phoneNumber: this.loginForm.controls['phnnum'].value,
      role: "DISTRIBUTOR"
    } 
    this.authService.loginWithMobileNumber(data).subscribe((res: any) => {
      if (res?.error == false) {
        this.uuid = res?.data.uuid;
        sessionStorage.setItem("AccessToken", JSON.stringify(res?.data.accessToken));
        this.isValid = false
        this.setExpireTimer();
      }
      else {
        this.errorMessage = res.message
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
  handleOtp(ot: any) {
    if (parseInt(ot) == 123456) {
      //  alert('success');
      // inputDisabled
    }
    else {
      //  alert('your otp is wrong')
    }
    this.otpfill = ot.join('').length == 6;
  }
  handleFill(value: any) {
    this.otpfill = value;
    // this.otpfill = ot.join('').length == 6;

  }
  loginbtn() {
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    const data = {
      phoneNumber: this.loginForm.controls['phnnum'].value,
      otp: this.otpfill,
      role: "DISTRIBUTOR",
      uuid :this.uuid
    }
    this.authService.verifyPhoneOtp(data).subscribe((res: any) => {
      if (res.error == false) {
        sessionStorage.setItem("AccessToken2", JSON.stringify(res?.data.accessToken))
        sessionStorage.setItem("UserId", JSON.stringify(res?.data.uuid));
        sessionStorage.setItem('refreshToken',JSON.stringify(res?.data.refreshToken))
        this.router.navigate(['./distributor-dashboard'])
      }
      if (res?.exceptionCode == 1012) {
        this.errorMessage = res?.message
        setTimeout(() => {
          this.errorMessage = ''
        }, 900000);
      }
      else {
        this.errorMessage = res?.message
        // setTimeout(() => {
        //   this.isValid = true
        // }, 2000);
      }
    });
  }
  statuspending() {

  }
  navigationtoMobileNumber() {
    this.isValid = true
  }
  showInitialAuthSection() {
    localStorage.removeItem("AccessToken");
    this.isValid = true;
  }


  clearErrorMessage() {
    if (this.errorMessage) {
      this.errorMessage = '';
      this.loginForm.controls['phnnum'].setErrors(null);
    }
  }
  signUpPage() {
    this.router.navigate(['./emailValidation'])
  }
  SignUp() {
    this.errorMessage = ''
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    const data = {
      phoneNumber: this.loginForm.controls['phnnum'].value,
      role: "DISTRIBUTOR",
      name: this.loginForm.controls['name'].value,
    }
    this.authService.signUpPhone(data).subscribe((res: any) => {
      if (res?.error == false) {
        this.optSendMessage="Verification code sent successfully!"
        setTimeout(()=> {
          this.optSendMessage = ""; 
      }, 3000);
        this.isValid = false
        this.setExpireTimer()
        this.uuid = res?.data.uuid
        sessionStorage.setItem("AccessToken", JSON.stringify(res?.data.accessToken));
        sessionStorage.setItem("UserId", JSON.stringify(res?.data.uuid));
        sessionStorage.setItem('SetPhoneNumber', JSON.stringify(data.phoneNumber))
        sessionStorage.setItem('SetName', JSON.stringify(data.name))
        sessionStorage.setItem('setEmail',JSON.stringify(res?.data.email))
      }
     
      //  if (res?.error == false && res?.data.onBoardingStatus == 'EMAIL_VERIFICATION_COMPLETE'){
      //   sessionStorage.setItem('setEmail',JSON.stringify(res?.data.email))
      //   this.router.navigate(['./welcome'])
      // }
      else{
        this.errorMessage = res?.message
      }
    })
  }
  sendAgain() {
    if(this.userSignUp){
      if (!this.isDisabled) {
      this.SignUp()
      }
    }
    else{
      if (!this.isDisabled) {
        this.contnw()
      }
    }
  }
  verifiedPage() {
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    const data = {
      phoneNumber: this.loginForm.controls['phnnum'].value,
      otp: this.otpfill,
      uuid: this.uuid,
      role: "DISTRIBUTOR"

    }
    this.authService.verifyPhoneOtp(data).subscribe({
      next : (res: any) => {
      if (res?.error == false) {
        sessionStorage.setItem("AccessToken2", JSON.stringify(res?.data.accessToken));
        sessionStorage.setItem('refreshToken',JSON.stringify(res?.data.refreshToken))
        this.mobileVerifiedpage = true;
        this.isValid = true
      }
       if (res?.error == false && res?.data.onBoardingStatus == 'EMAIL_VERIFICATION_COMPLETE'){
        sessionStorage.setItem('setEmail',JSON.stringify(res?.data?.email))
        this.router.navigate(['./welcome'])
      }
      if (res?.error == false && res?.data?.onBoardingStatus == 'APPLY_AS_ASSOCIATE'){
        this.router.navigate(['./welcome'])
      }
      if (res?.error == false && res?.data?.onBoardingStatus == 'APPROVAL_PENDING' || res?.data?.onBoardingStatus == 'APPROVAL_REJECTED' 
      || res?.data?.onBoardingStatus == 'APPROVAL_APPROVED'){
        this.router.navigate(['./registersuccess'])
      }
      if ( res?.error == false && res?.data?.onBoardingStatus == 'REGISTRATION_PENDING'){
        this.router.navigate(['./register'])
      }
      if ( res?.error == false && res?.data?.onBoardingStatus == 'ON_BOARDING_COMPLETED'){
        this.router.navigate(['./customer-dashboard'])
      }
      if (res?.exceptionCode == 1012) {
        this.errorMessage = res?.message
        setTimeout(() => {
          this.errorMessage = ''
        }, 900000); 
      }
      else {
        this.errorMessage = res?.message
      }
    },
      error: (err) => {
        this.errorMessage = "No Active Internet Found, Please connect to active internet Connection."
      }
    });
  }
  navigateBackArrow(){
    this.router.navigate(['/login2'])
  }
}
