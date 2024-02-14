import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  // baseUrl = environment.baseUrl;
  dashboardUrl = environment.dashboardUrl;
  baseCustomerURl = environment.baseCustomerURl;
  baseURLAuthentication = environment.baseURLAuthentication;
  baseURLDocumentation = environment.baseURLDocumentation;
  geoLocationKey = environment.geoLocationKey;
  panAadharUrl = environment.panAadharverify;
  AuthenticationApis = environment.authApis;
  httpClient: HttpClient;
  
 
  constructor(private http: HttpClient, private handler: HttpBackend,) {
    this.httpClient = new HttpClient(handler);
  }
  // public getHeader(){
  //   const accessToken = JSON.parse(localStorage.getItem('session')?? '');
  //   const headers = {
  //     'session' : 'Bearer '+ accessToken,
  //     // 'userId' : loginDetails.userId
  //   }
  //   return headers;
  // }

  // DistributerRegister(body: any, userId: any) {
  //   // let params1 = new HttpParams().set('userId','1')
  //   return this.http.post<any>(this.baseUrl + `/distributor/${userId}`, body);
  // }
  // logindetails(data: any) {
  //   return this.http.post(this.baseURLAuthentication + '/login', data)
  // }
  // sendEmail(data: any, userId: any) {
  //   return this.http.get(this.baseURLAuthentication + `/sendemail?userId=${userId}&email=${data.email}&phoneNumber=${data.phoneNumber}`)
  // }
  // verifyEmail(userId: any, email: any, otp: any) {
  //   return this.http.get(this.baseURLAuthentication + `/verifyemail?userId=${userId}&email=${email}&otp=${otp}`)
  // }
  setUpPassword(data: any) {
    return this.http.post(this.baseURLAuthentication + `/setpassword`, data)
  }
  // forgotPassword(email: any) {
  //   return this.http.get(this.baseURLAuthentication + `/forgotPassword?email=${email}`)
  // }
  // loginWithPassword(data: any) {
  // //   return this.http.post(this.baseURLAuthentication + `/loginWithPassword`, data)
  // // }
  // validateOtp(email: any, otp: any) {
  //   return this.http.get(this.baseURLAuthentication + `/email/validateOtp?email=${email}&otp=${otp}`)
  // }
  // http://65.1.142.222:8092/api/loginWithPassword
  // http://65.1.142.222:8092/api/setpassword
  uploadDocument(userId: any, DocumentType: any, formData: any) {
    return this.http.post<any>(this.baseURLDocumentation + `/uploadFile?DocumentType=${DocumentType}&userId=${userId}`, formData);
  }

  public distributerStatus(userId: any) {
    // let params2 = new HttpParams().set('userId','1')
    return this.http.get<any>(this.dashboardUrl + `/${userId}`);
  }
  public signup(data: any) {
    return this.http.post<any>(this.baseURLAuthentication + '/signUp', data);
    // /signUp
  }
  approvestatus(distributorId: any, body: any) {
    return this.http.put<any>(this.baseURLAuthentication + `/distributor/updateStatus/${distributorId}`, body,);
  }
  // /distributor/updateStatus/6409ebe9497c030df9e2128a
  //         distributor saving customer details will start
  CustomerSave(body: any) {
    return this.http.post<any>(this.AuthenticationApis + '/v1/validateCustomerOnBoardingInfo', body);
  }
  getCustomerByName(fullname: any) {
    return this.http.get<any>(this.AuthenticationApis + `/v1/getCustomerSearchByDistributor?searchKey=${fullname}`);
  }
  saveCustomerDetails(body: any, customerId: any,distributorId:any) {
    return this.http.post<any>(this.AuthenticationApis + `/v1/saveCustomerDetails?customerId=${customerId}&&distributorId=${distributorId}`, body);
  }
  customerUploadDocument(customerId: any, DocumentType: any, formData: any) {
    return this.http.post<any>(this.baseURLDocumentation + `/uploadFile?DocumentType=${DocumentType}&userId=${customerId}`, formData);
  }

  getCustomerInfoById() {
    return this.http.get<any>(this.AuthenticationApis + `/v1/getAllCustomersByDistributor`);
  }
  UpdateCustomer(cutomerId, data) {
    return this.http.put<any>(this.baseCustomerURl + `/updateCustomerDetails?customerId=${cutomerId}`, data);
  }

  getCurrentAddressUsingLATLONG(latitude, longitude) {
    return this.httpClient.get<any>('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + this.geoLocationKey);
  }
  emailVerifyCheck(userId: any) {
    return this.http.get<any>(this.baseURLAuthentication + `/user?userId=${userId}`);
  }
  updateEmail(customerId, emailId,) {
    return this.http.put<any>(this.baseCustomerURl + `/customer/updatePrimarymail?customerId=${customerId}&customerprimarymail=${emailId}`, '');
  }
  distributorDashboardWithDates(distributorId, startDate, endDate) {
    return this.http.get<any>(this.dashboardUrl + `/distributorDashboard?distributorId=${distributorId}&fromDate=${startDate}&toDate=${endDate}`);
  }
  deliquentApi(data){
    return this.http.post<any>(this.baseURLAuthentication+`/getDelinquentApplicationsByDistributorId`, data)
  }
  getpolicydetails(customerId, proposalNumber,proposalStatus) {
    return this.http.get<any>(this.baseURLAuthentication + `/getPolicyDetails?customerId=${customerId}&proposalNumber=${proposalNumber}&proposalStatus=${proposalStatus}`);
  }
  getproposaldetails(proposalId:any) {
    return this.http.get(this.baseURLAuthentication +`/getProposalAndDistributorDetails?proposalId=${proposalId}`)
  }
  getAllCustomerList(distributorId) {
    return this.http.get<any>(this.AuthenticationApis +`/v1/distributor/getallcustomerlist/${distributorId}`);
  }

  deleteproposal(proposalNumber) {
    return this.http.delete<any>(this.baseURLAuthentication +`/deleteProposal?proposalNumber=${proposalNumber}`)
  }
  uploadPolicy(data){
    return this.http.post<any>(this.baseURLAuthentication+`/uploadPolicyDocument`, data);
  }
  // Document(userId: any, DocumentType: any, formData: any) {
  //   return this.http.post<any>(this.baseURLDocumentation + `/document/uploadFile?DocumentType=${DocumentType}&userId=${userId}`, formData);
  // }
  LinkDistributorCustomer(customerId,distributorId){
    return this.http.put<any>(this.AuthenticationApis+`/v1/linkDistributorAndCustomer?customerId=${customerId}&distributorId=${distributorId}&isContinue=true`,null);
  }

  documentsPendingReminder(customerId,distributorId,proposalNumber){
    return this.http.get<any>(this.baseCustomerURl+`/customer/sendNotification?customerId=${customerId}&distributorId=${distributorId}&proposalNumber=${proposalNumber}`)
  }
  resendProposalLink(data){
  return this.http.post<any>(this.baseURLAuthentication+`/reSendProposalLink`,data);
  }
  
  deleteCustomer(customerId,distributorId){
    return this.http.delete(this.AuthenticationApis+`/v1/deleteCustomer?customerId=${customerId}&distributorId=${distributorId}`)
  }
  userUpdatedStatus(data){
    return this.http.put(this.baseURLAuthentication + `/userupdate`, data)
  }
  DeliquentViewdetails(emiStatus, emisPaid, proposalNumber) {
    return this.http.get<any>(this.AuthenticationApis + `/viewDelinquentDetails?emiStatus=${emiStatus}&emisPaid=${emisPaid}&proposalNumber=${proposalNumber}`);
  }
  skipNotification(customerId,distributrorId){
    return this.http.get(this.baseCustomerURl + `/customer/sendCustomerAddedNotifi?customerId=${customerId}&distributorId=${distributrorId}`)
  }
  emiNotification(customerId){
    return this.http.get(this.baseCustomerURl + `/customer/sendEmiNotification?customerId=${customerId}`)
  }
panValid(data){
  return this.http.post(this.panAadharUrl + '/pan/verify', data)
}
  aadharValid(data){
    return this.http.post(this.panAadharUrl + '/aadhar/generateToken', data)
  }
  aadharGenerateOtp(data){
    return this.http.post(this.panAadharUrl + '/aadhar/generateOTP', data)
  }
  aadharValidation(data){
    return this.http.post(this.panAadharUrl + '/aadhar/v2/verify', data)
  }
  refreshCaptcha(data){
    return this.http.post(this.panAadharUrl + '/aadhar/refreshCaptcha', data)
  }
  BankVerify(data){
    return this.http.post(this.panAadharUrl + '/bank/verify', data)
  }
  distributorSave(distributorid,data){
    return this.http.post(this.AuthenticationApis + `/v1/saveOnboardingDistributorInfo/${distributorid}`, data)
  }
  saveEmployment(body: any) {
    return this.http.post<any>(this.AuthenticationApis + `/v1/validateCustomerEmploymentDetails`, body);
  }
  SaveCustomerInfo(cutomerId, data) {
    return this.http.post<any>(this.AuthenticationApis + `/v1/saveCustomerOnBoardingInfo/${cutomerId}`, data);
  }
  sendCustomerEmail(userId){
    return this.http.post(this.AuthenticationApis + `/v1/sendCustomerEmailVerificationLink/${userId}`,'')
  }
  customerVerifyEmail(data) {
    return this.http.put(this.AuthenticationApis + `/v1/verifyCustomerEmail`,data)
  }
  getCustomerData(userId: any) {
    return this.http.get<any>(this.AuthenticationApis + `/v1/getCustomerData?uuid=${userId}`);
  }
  distributorStatus(){
    return this.http.get<any>(this.AuthenticationApis + `/v1/getDistributorData`);
  }
 
} 



