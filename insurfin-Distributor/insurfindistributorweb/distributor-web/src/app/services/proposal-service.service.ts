import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProposalServiceService {

  proposalToken = environment.baseURLAuthentication;
  dashboardUrl = environment.baseURLAuthentication;
  accessToken:any;


  constructor(private http: HttpClient) { }
  // public getHeader(){
  //   const loginDetails = JSON.parse(localStorage.getItem('loginDetails')?? '');
  //   const headers = {
  //     'Authorization' : 'Bearer '+loginDetails.accessToken,
  //     'userId' : loginDetails.userId
  //   }
  //   return headers;
  // }
  proposalAllProducts(){
    return this.http.get(this.proposalToken + `/getInsuranceTypeNames`);
  }
  getInsurerData(data:any) {
    return this.http.get(this.proposalToken + `/getInsurerNames?insuranceTypeId=`+data);
  }
  getProductTypeData(data:any) {
    return this.http.get(this.proposalToken + `/getAllProductTypes?insurerId=`+data);
  }
  getAllProductsData(data:any) {
    return this.http.get(this.proposalToken + `/getAllProducts?productTypeId=`+data);
  }
  SaveProposalData(data:any) {
    // return this.http.post(this.proposalToken + `/insuranceproposal/saveinsuranceproposal=`+data);
    return this.http.post<any>(`${this.proposalToken}/saveProposal`,data);
  }
  getAllBankDetails(insurerId){
    return this.http.get(this.proposalToken + `/bankAccounts/getBankDetails?insurerId=${insurerId}`);
  }
  // getIfscCode(data:any){
  //   return this.http.get(this.proposalToken + `/bankaccounts/getdetails?insurerId=`+data);
  // }
  viewProposalStatus(customerId, proposalNumber){
    return this.http.get(this.dashboardUrl + `/viewProposalStatus?customerId=${customerId}&proposalNumber=${proposalNumber}`)
  } 
  registrationRemindnow(proposalId){
    return this.http.post(this.proposalToken + `/completionReminder?proposalId=${proposalId}`,'');
  }
}

