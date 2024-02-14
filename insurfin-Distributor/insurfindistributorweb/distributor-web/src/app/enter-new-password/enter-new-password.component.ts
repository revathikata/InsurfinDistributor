import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterServiceService } from '../services/register-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-enter-new-password',
  templateUrl: './enter-new-password.component.html',
  styleUrls: ['./enter-new-password.component.css']
})
export class EnterNewPasswordComponent implements OnInit {

  newPasswordForm!: FormGroup
  enter = true
  email: any;
  otp: any;
  hidePassword = true;
  showPassword = true
  uuid: any;
  errorMsg: any;
  BtnDisable: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private registerService: RegisterServiceService,
    private router: Router,
    private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.newPasswordForm = this.formBuilder.group({
      enterpassword: ["", [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[aA-zZ]).{8,15}$")]],
      repassword: ["", Validators.required]

    }, { validators: this.matchpassword });

  }

  matchpassword(newPasswordForm: FormGroup) {
    return newPasswordForm.controls['enterpassword'].value && newPasswordForm.controls
    ['enterpassword'].value === newPasswordForm.controls['repassword'].value ? newPasswordForm.controls
    ['repassword'].setErrors(null) : newPasswordForm.controls['repassword'].setErrors({ 'misMatch': true })
  }

  resetPassword() {
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    if (this.newPasswordForm.valid) {
      this.uuid = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
      const data = {
        uuid: this.uuid,
        password: this.newPasswordForm.controls['enterpassword'].value
      }
      this.authService.setUpPassword(data).subscribe({
        next: (res:any) =>{
          if (res?.error == false) {
            // sessionStorage.setItem("AccessToken2", JSON.stringify(res?.data?.accessToken));
            this.enter = false
          }
          else{
            this.errorMsg = res?.message
          }
        },
      });

    } else {
      alert('enter something wrong')
    }
  }
  resetps() {
    // this.router.navigate(['./reset-password']);
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  PasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  navigateBackArrow() {
    this.router.navigate(['/reset-password'])
  }
  backBtn() {
    this.router.navigate(['./login2'])
  }
}
