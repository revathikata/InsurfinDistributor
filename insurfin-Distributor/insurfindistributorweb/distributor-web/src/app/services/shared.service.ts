import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  selectedTab :any;
  customerProposalList: any;
  public policy:boolean = false
  public detailsNotUpload:boolean = false
  public policyDetailsUploaded:boolean = true

  public proposalAccepted:boolean = false
  public customerdropout:boolean = false
  public proposalNotAccepted:boolean = false
  public loanInitiate:boolean = false
  public loansInProcess:boolean = true
  salaryEmail: any;
  selfEmail: any;
  detailsList: any;
  updatecustomerMsg: any;
  conformBackArrow: any;

  constructor(

  ) { }
  setCustomerProposal(details: any) {
    this.customerProposalList = details;
  }
  getCustomerProposal() {
    return this.customerProposalList
  }
  setTab(Data :any){
    this.selectedTab = Data;
  }
  getTab(){
    return this.selectedTab
  }
  showdata:any
  editbtn(data:any){
    this.showdata = data
  }
  disablebtn(){
    return this.showdata
  }
  setSalariedPrimaryEmail(email){
    this.salaryEmail = email;
  }
  getSalariedPrimaryEmail(){
    return this.salaryEmail
  }
  setSelfPrimaryEmail(email){
    this.selfEmail = email;
  }
  getSelfPrimaryEmail(){
    return this.selfEmail
  }
  setDashboardList(list){
    this.detailsList =list 
  }
  getDashboardList(){
    return this.detailsList 
  }
  setupdatecustomer(message){
    this.updatecustomerMsg =message 
  }
  getupdatecustomer(){
    return this.updatecustomerMsg
  }
  
  setConformPopupNavigation(yes){
    this.conformBackArrow = yes 

  }
  getConformPopupNavigation(){
   return  this.conformBackArrow

  }
}
