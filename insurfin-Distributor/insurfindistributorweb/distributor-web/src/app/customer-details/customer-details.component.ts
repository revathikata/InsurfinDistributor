import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerifyEmailPopupComponent } from '../verify-email-popup/verify-email-popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterServiceService } from '../services/register-service.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {

  isDisabled = true
  customerId: any;
  emailverified: any;
  notverified: any;
  emailcheck: any;
  documentChecking: any;
  updateMessage: any;
  verifyEmail:any;
  salariedEmailId:any;
  primaryEmail: any;
  phoneNumber: any;
  userData: any;

  constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute,
    private registerService : RegisterServiceService,private sharedservice:SharedService) { }
    ngOnInit() {
      // this.documentCheck();
      this.emailCheck();  
      this.updateMessage = this.sharedservice.getupdatecustomer()
    }
  completeKyc() {
    this.router.navigate(['/new-customer'], { queryParams: { tab: 4 } });
  }
  emailCheck(){
    this.customerId = JSON.parse(sessionStorage.getItem('customerUuid') ?? 'null');
    this.registerService.getCustomerData(this.customerId ).subscribe((res) =>{
    if(res.error == false){
      this.emailverified = res?.data.customerOnBoardingStatus
      this.userData = res?.data
    }
    });
  }
  emailVerification(){
    this.dialog.open(VerifyEmailPopupComponent,{data:this.userData})   
  }

  createProposal(){
    this.router.navigate(['/personal-details'])
  }
  // documentCheck(){
  //   this.customerId =JSON.parse(localStorage.getItem('customerId') ?? 'null')
  //   this.registerService.getCustomerInfoById(this.customerId).subscribe((res:any) =>{
  //   this.documentChecking   = res.documentList;
  //   this.verifyEmail = res.employementDetails?.salariedEmployeeDetails?.primaryEmail
  //   // console.log(this.verifyEmail);

  //   if(this.sharedservice.getSalariedPrimaryEmail() != null){
  //     this.verifyEmail = this.sharedservice.getSalariedPrimaryEmail()
  //   // console.log(this.salariedEmailId, 'salaried');
  //   }
  //   else{
  //     this.verifyEmail = this.sharedservice.getSelfPrimaryEmail()
  //   // console.log(this.verifyEmail, 'self');
  //   }
    
  //   }) 
  // }
}
