import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  AuthenticationApis = environment.authApis;
  dashboardUrl = environment.dashboardUrl;
  constructor(private http: HttpClient,) { }

  loginWithPassword(data: any) {
    return this.http.post(this.AuthenticationApis + '/v1/loginWithPassword', data)
  }
  signUpPhone(data){
    return this.http.post(this.AuthenticationApis + '/v1/signUpWithPhoneNumber', data)
  }
  // signupmobileVerify(data){
  //   return this.http.post(this.AuthenticationApis + '/v1/verifyPhoneOTP', data)
  // }
  signupEmail(data){
    return this.http.post(this.AuthenticationApis + '/v1/signUpEmail', data)
  }
 EmailOtpVerify(data){
    return this.http.post(this.AuthenticationApis + '/v1/verifyEmailOTP', data)
  }
  DistributorOnboarding(data){
    return this.http.put(this.AuthenticationApis + '/v1/updateOnBoardingStatus', data)
  }
  loginWithMobileNumber(data){  
    return this.http.post(this.AuthenticationApis + '/v1/loginWithPhoneNumber', data)
  }
  verifyPhoneOtp(data){
    return this.http.post(this.AuthenticationApis + '/v1/verifyPhoneOTP' , data)
  }
  signUpwithPhoneNumber(data){
    return this.http.post(this.AuthenticationApis+'/v1/loginWithPhoneNumber',data)
  }

  // signUpPhoneOTP(otp){
  //   return this.http.post(this.AuthenticationApis+'/v1/verifyPhoneOTP',otp);
  // }

  setUpPassword(data){
    return this.http.post(this.AuthenticationApis+'/v1/passwordSetUp',data);
  }
  resentOtp(data){
    return this.http.post(this.AuthenticationApis+'/v1/resendOtp',data);
  }
  logout(data){
    return this.http.post(this.AuthenticationApis+'/v1/logout',data);
  }
  renewAccessToken(data){
    return this.http.post(this.AuthenticationApis+'/v1/renewAccessToken',data)
  }
}
