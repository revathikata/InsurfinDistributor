import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ReminderSentPopupComponent } from './reminder-sent-popup/reminder-sent-popup.component';
import { Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { PleaseConfirmCustomerpopupComponent } from 'src/app/please-confirm-customerpopup/please-confirm-customerpopup.component';
import { ResendLinkPopupComponent } from '../resend-link-popup/resend-link-popup.component';

@Component({
  selector: 'app-more-actions-popup',
  templateUrl: './more-actions-popup.component.html',
  styleUrls: ['./more-actions-popup.component.css']
})


export class MoreActionsPopupComponent {
  proposalViewList :any;
  distributorId: any;
  customerId: any;
  proposalNumber: any;

constructor(private bottomSheetRef:MatBottomSheetRef<MoreActionsPopupComponent> ,private dialog:MatDialog , private router:Router,
   private registerService:RegisterServiceService,  @Inject(MAT_BOTTOM_SHEET_DATA) public dialogData: any,){}

ngOnInit(): void {
  this.proposalViewList = this.dialogData
  // this.distributorId = JSON.parse(localStorage.getItem('getdistributorId') ?? '');
}
  uploadDocuments(){
    this.bottomSheetRef.dismiss('uploaded')
  }
  close(){
    this.bottomSheetRef.dismiss()
  }

  opendialouge(){
    this.dialog.open(ReminderSentPopupComponent,{data:this.proposalViewList})
    this.registerService.documentsPendingReminder(this.proposalViewList.customerId,this.distributorId,this.proposalViewList.proposalNumber).subscribe((res:any)=>{
      
    })
  }
  viewDetails(){
    // this.proposalViewList = JSON.parse(localStorage.getItem('proposalList') ?? '');
    sessionStorage.setItem('proposalViewDetails', JSON.stringify(this.proposalViewList));
    this.router.navigate(['./view-customer-details/']);
    this.bottomSheetRef.dismiss()
  }
  proposaldetails:any;
  deleteproposal(){
     this.dialog.open(PleaseConfirmCustomerpopupComponent,{data: this.proposalViewList})
    //  localStorage.setItem('deleteprop','deleteproposal')
     this.bottomSheetRef.dismiss()
     //localStorage.removeItem('delete');
  }

  deletecustomer(){
    this.dialog.open(PleaseConfirmCustomerpopupComponent)
    // localStorage.setItem('delete','deletecustomer')
    this.bottomSheetRef.dismiss()
    // localStorage.removeItem('deleteprop');
  }
  resendLink() {
    const data = {
        customerId:  this.proposalViewList.customerId,
        proposalId:  this.proposalViewList.proposalId,
        proposalNumber: this.proposalViewList.proposalNumber,
    }
    this.registerService.resendProposalLink(data).subscribe((res:any) =>{
     let link = res?.data.ProposalLink
     this.bottomSheetRef.dismiss()
     if(res.error === false){
      this.dialog.open(ResendLinkPopupComponent,{data:link})
     }
     else{
      alert(res.message)
     }
    })
  }
}
