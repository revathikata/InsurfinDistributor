import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { SharedService } from 'src/app/services/shared.service';
import { MoreActionsPopupComponent } from '../../loans-in-process/more-actions-popup/more-actions-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditDeletePopupComponent } from '../../total-loan-disbursed/edit-delete-popup/edit-delete-popup.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
//import { PleaseConfirmCustomerpopupComponent } from 'src/app/please-confirm-customerpopup/please-confirm-customerpopup.component';
import { ResendLinkPopupComponent } from '../../loans-in-process/resend-link-popup/resend-link-popup.component';

@Component({
  selector: 'app-customer-proposal-list',
  templateUrl: './customer-proposal-list.component.html',
  styleUrls: ['./customer-proposal-list.component.css']
})
export class CustomerProposalListComponent {
  distributorId: any;
  dashboardData: any;
  filteredCustomerList: any;
  customerId: any;
  customerProposalDetails: any;
  panelOpenState!: boolean;


  constructor(
    private router: Router,
    private registerService: RegisterServiceService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    private bottomSheets: MatBottomSheet,
  ) {
    this.customerId = this.route.snapshot.params['customerId'];
  }


  ngOnInit(): void {
    this.customerProposalDetails = this.sharedService.getCustomerProposal();
    console.log(this.customerProposalDetails?.proposalDetailsList);
  }

  viewProposalDetails(details: any) {
    // console.log(details);
    this.router.navigate(['./view-customer-details/' + this.customerProposalDetails.customerId + '/' + details.proposalNumber + '/' + details.proposalStatus]);
  }

  moreactionpopup() {
    this.bottomSheets.open(EditDeletePopupComponent);
    // this.bottomSheets.dismiss();
    // this.dialogRef.afterClosed().subscribe((res) => {
    // })
  }

  deleteCard(proposal: any): void {
    const index = this.customerProposalDetails?.proposalDetailsList.indexOf(proposal);
    if (index !== -1) {
      this.customerProposalDetails?.proposalDetailsList.splice(index, 1);
    }
    const proposalNumber = proposal.proposalNumber
    this.registerService.deleteproposal(proposalNumber).subscribe((result: any) => {
    })
  }
  resendpopup(proposalIdd:any) {
    const data = {
        customerId: proposalIdd.cutomerId,
        proposalId: proposalIdd.proposalId
    }
    this.registerService.resendProposalLink(data).subscribe((res:any) =>{
     let link = res?.data.ProposalLink
     if(res.error === false){
      this.dialog.open(ResendLinkPopupComponent,{data:link})
     }
     else{
      alert(res.message)
     }
    })
  }

}


