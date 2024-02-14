import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

  loginForm!: FormGroup;
  getemail: any;
  phonenumber: any;
  message: any;
  getdistributorId: any;
  setpassword: any;
  fullName: string | null = null;
  showPassword = true
  errorMessage: any;
  serverErr: any;
  getmail: any;
  getEmail: any;
  BtnDisable: boolean = false;

  constructor(private fb: FormBuilder,
    private registerService: RegisterServiceService, private authService : AuthServiceService,
    private router: Router,) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", [Validators.required]]

    });
    if(sessionStorage.getItem('email') !== null){
      this.getEmail = JSON.parse(sessionStorage.getItem('email') ?? 'null')
      this.loginForm.patchValue({email:this.getEmail})
    }
    else{
      sessionStorage.clear();
    }
  }


  // login() {
  //   // this.getemail =localStorage.getItem('email')
  //   this.phonenumber =JSON.parse(localStorage.getItem('phonenumber') ?? '')
  //   const data = {
  //     phoneNumber: this.phonenumber,
  //     // email: this.loginForm.controls['phonenumberemail'].value,
  //     otp: this.loginForm.controls['password'].value,
  //   }
  //   this.registerService.loginWithPassword(data).subscribe((res:any) => {
  //     localStorage.setItem("AccessToken",JSON.stringify(res?.data.accessToken))
  //     // this.message = res.message
  //     if(res.error == false){
  //       // localStorage.setItem("AccessToken", JSON.stringify(res?.data.accessToken))
  //       // localStorage.setItem('loginDetails', JSON.stringify(res?.data));
  //       // localStorage.setItem('getuserId', JSON.stringify(res?.data?.userId))
  //       // this.router.navigate(['./customer-dashboard'])
  //       const loginDetails  = res.data;
  //       this.registerService.distributerStatus(loginDetails?.userId).subscribe((result: any) => {
  //         // if (result?.error == true) {
  //         //   this.router.navigate(['./welcome'])
  //         // }
  //         //  if (result?.error == false && result?.data.approvalStatus == 'APPROVED') {
  //         this.getdistributorId = result?.data?.distributorId;
  //         localStorage.setItem('getdistributorId', JSON.stringify(this.getdistributorId))
  //         localStorage.setItem('getuserId', JSON.stringify(result?.data?.userId))
  //         localStorage.setItem('getDistributorName', JSON.stringify(result?.data?.distributorName))
  //         this.router.navigate(['./customer-dashboard'])
  //         // }
  //         // else if (result?.error == false && result?.data.registrationStatus == 'STARTED') {
  //         //   localStorage.setItem('selectedIndex','0');
  //         //   this.router.navigate(['./register']);
  //         // }
  //         // else if (result?.error == false && result?.data.approvalStatus == 'PENDING') {
  //         //   this.router.navigate(['./registersuccess']);
  //         // }
  //         // else if (result?.error == false && result?.data.approvalStatus == 'REJECTED') {
  //         //   this.router.navigate(['./registersuccess']);
  //         // }
  //       });
  //     }
  //     else {
  //       this.message = 'username and password not matched'
  //     }
  //   });
  // }
  forgetPasswords(){
    // localStorage.setItem('resetPassword', 'resetps')
    this.router.navigate(['./reset-password'])
  }
  PasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  navigateToMobile(){
    this.router.navigate(['./login'])
  }
  signup(){
    this.router.navigate(['./login'],{ queryParams: {userSignUp:true} })
  }
  Login(){
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    const data = {
      email : this.loginForm.controls['email'].value,
      role : "DISTRIBUTOR",
      password : this.loginForm.controls['password'].value,
    }
    this.authService.loginWithPassword(data).subscribe({
      next: (res:any) => {
      if(res?.error == false){
        sessionStorage.setItem("AccessToken2", JSON.stringify(res?.data.accessToken));
        sessionStorage.setItem("UserId", JSON.stringify(res?.data.uuid));
        sessionStorage.setItem('SetName', JSON.stringify(res?.data.name))
        sessionStorage.setItem('onBoardingStatus',JSON.stringify(res?.data.onBoardingStatus))
        sessionStorage.setItem('refreshToken',JSON.stringify(res?.data.refreshToken))
        this.router.navigate(['./customer-dashboard'])
      }
      else{
        this.errorMessage = res?.message
      }
    },
    error: (err) => {
      this.errorMessage = "No Active Internet Found, Please connect to active internet Connection."
    }
    });
  }
}
