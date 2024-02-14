import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataMismatchPopupComponent } from 'src/app/data-mismatch-popup/data-mismatch-popup.component';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent {

  otpfill: any;
  aadhaarVerify: boolean = true;
  captchaVerified: boolean = false;
  selectedIndex: number;
  captcha: any;
  captchaText: any
  captchaToken: any;
  loginUserId: any;
  errorMsg: any;
  errorCaptcha: any;
  validOtp: any;
  data: any;
  routeData: any;
  userAadhaarNumber:any;
  aadharNameError: any;

  constructor(private router: Router, private spinner: NgxSpinnerService,private dialogRef: MatDialogRef<CaptchaComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialog, 
    private registerService: RegisterServiceService,
    private route: ActivatedRoute) {
   
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        const userData = navigation.extras.state['userData'];
        this.data = userData;
      }
  }
  ngOnInit() {
    this.userAadhaarNumber = sessionStorage.getItem('aadharNumber')?.replace(/\d{4}(?=.)/g, '$& ');
  }
  goToPreviousTab() {
  //  this.dialogRef.close()
    this.router.navigate(['/register'])
  }
  handleFill(value: any) {
    this.otpfill = value;
    // this.otpfill = ot.join('').length == 6;

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
  onContinue() {
    this.loginUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    const data = {
      token: this.data.token,
      captcha: this.captchaText,
      userId: this.loginUserId
    }
    this.registerService.aadharGenerateOtp(data).subscribe((res: any) => {
      if (res?.error == false) {
        this.aadhaarVerify = false;
        this.captchaToken = res?.data.token
      }
      else{
       this.errorCaptcha =  res?.message
      }
    })
    //   if(this.captchaVerified){


    //     this.aadhaarVerify=true;
    //  this.captchaVerified=false;
    //   }
    //   else if(this.aadhaarVerify){
    //    this.dialogRef.closeAll()
    //     this.spinner.show()
    //     setTimeout(() => {
    //       this.spinner.hide();
    //     }, 3000);
    //     this.router.navigate(['/register'])

    //   }
    //   else{

    //   }

  }
  reloadCaptcha(){
    const data = {
      token : this.data.token
    }
    this.registerService.refreshCaptcha(data).subscribe((res:any) =>{
this.data = res?.data
this.captchaToken = res?.data.token
    })
  }
  AadharValidation() {
    this.loginUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    const data = {
      token: this.captchaToken,
      otp: this.otpfill,
      share_code: 1234,
      fullName: this.data.fullname,
      dataOfBirth: this.data.dob,
      gender: this.data.gender,
      userId: this.loginUserId
    }
    sessionStorage.setItem('SetName', JSON.stringify(data.fullName))
    this.registerService.aadharValidation(data).subscribe((res: any) => {
      if(res?.error == false){
        this.validOtp = res.message
        this.routeData = {
          result :res,
          aadharNumber : this.data.aadharNumber,
          // dob: this.data.dob,
          // gender: this.data.gender
        }
      this.router.navigate(['/register'], { state:
      //     { userData: this.routeData,
      //    } });
      //    sessionStorage.setItem('persnlDetails', JSON.stringify(this.routeData))
     
      // }
      // else{
      //   this.errorMsg = res?.message
      //   if(this.errorMsg === "data mismatched"){
      //      this.router.navigate(['/register']);
      //      this.dialog.open(DataMismatchPopupComponent,{
      //       width: '329px',
      //       height: '239px'
      //      })
      //   }
       
      // //  this.dialogRef.close(res);
      // }
      { userData: this.aadharNameError
      } });
      sessionStorage.setItem('persnlDetails', JSON.stringify(this.routeData))
    // this.dialogRef.close(res);
   }
   else{
     if(res?.exceptionCode === '1078'){
    this.aadharNameError = res?.message
    this.router.navigate(['/register'], { state:
     { userData: this.aadharNameError
    } });
     }
    else if(res?.exceptionCode === '1006'){
       this.errorMsg = res?.message
     }
     else{
      
       this.router.navigate(['/register'])
       this.dialog.open(DataMismatchPopupComponent,{
         width: '329px',
         height: '239px',
         data: {
           errorMsg: res?.message 
       }
       })
     }
    }
  })
}
}
