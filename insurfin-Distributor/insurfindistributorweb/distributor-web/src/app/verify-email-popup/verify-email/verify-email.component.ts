import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  userId: any;
  primaryEmail: any;
  keyValue: any;
  emailVerifiedSuccess: any;
  notVerified: any;
  constructor( 
    private route: ActivatedRoute,private registerService: RegisterServiceService){}
    
  ngOnInit() {
  this.userId=this.route.snapshot.queryParamMap.get('userId');
  this.keyValue = this.route.snapshot.queryParamMap.get('key');
  this.primaryEmail = this.route.snapshot.queryParamMap.get('email');
  // console.log(this.userId,'prop');
  // if(this.userId){
    this.emailVerify()
  //  }
}
emailVerify(){
  // this.primaryEmail =JSON.parse(localStorage.getItem('primaryEmail') ?? '')
  const data = {
    email : this.primaryEmail,
    otp : this.keyValue,
    customerOBUuid : this.userId
  }
  this.registerService.customerVerifyEmail(data).subscribe((res: any) => {
    if(res?.error == false){
      this.emailVerifiedSuccess = "Email ID verified!";
    }
    else if(res?.error == true && res?.data.emailVerified == true){
     this.emailVerifiedSuccess = "Email ID already verified!"
    }
    else{
      this.emailVerifiedSuccess = "Email Id not Verified"
      this.notVerified = true
    }
      // console.log(res); 
      });
}
}
