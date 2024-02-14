import { Component } from '@angular/core';
import { ProposalServiceService } from '../services/proposal-service.service';
import { ReminderSentPopupComponent } from '../customer-dashboard/loans-in-process/more-actions-popup/reminder-sent-popup/reminder-sent-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterServiceService } from '../services/register-service.service';
@Component({
  selector: 'app-proposal-status',
  templateUrl: './proposal-status.component.html',
  styleUrls: ['./proposal-status.component.css']
})
export class ProposalStatusComponent {
  name = 'Angular';
  currentStep = 1;
  numSteps = 4;
  newcustomer:any;
  viewData: any;
  customerId: any;
  proposalNumber: any;
  documentUploaded:boolean;
  registrationCompleted:boolean;
  proposalAccepted:boolean;
  constructor( private ProposalData: ProposalServiceService,private matDialog:MatDialog,
    private registerService: RegisterServiceService,){}
 
ngOnInit() {
  this.customerId =JSON.parse(sessionStorage.getItem('customerUuid') ?? 'null');
  this.proposalNumber = JSON.parse(sessionStorage.getItem('proposalnumber') ?? 'null');
  this.viewPropsal()
  this.newcustomer = localStorage.getItem('new-customer');
  if(this.newcustomer === "nextstep" ){
    this.currentStep = 2;
    this.currentStep++;
// alert(this.currentStep)
    if (this.currentStep > this.numSteps) {
      this.currentStep = 1;
    }
    var stepper = document.getElementById('stepper1');
    var steps = document.getElementsByClassName('step');

    Array.from(steps).forEach((step, index) => {
      let stepNum = index + 1;
      if (stepNum === this.currentStep) {
        this.addClass(step, 'editing');
      } else {
        this.removeClass(step, 'editing');
      }
      if (stepNum < this.currentStep) {
        this.addClass(step, 'done');
      } else {
        this.removeClass(step, 'done');
      }
    });
  }
}
  nextStep() {
    this.currentStep++;
    // alert(this.currentStep)
    if (this.currentStep > this.numSteps) {
      this.currentStep = 1;
    }
    var stepper = document.getElementById('stepper1');
    var steps = document.getElementsByClassName('step');

    Array.from(steps).forEach((step, index) => {
      let stepNum = index + 1;
      if (stepNum === this.currentStep) {
        this.addClass(step, 'editing');
      } else {
        this.removeClass(step, 'editing');
      }
      if (stepNum < this.currentStep) {
        this.addClass(step, 'done');
      } else {
        this.removeClass(step, 'done');
      }
    });
  }
  hasClass(elem: { className: string; }, className: string) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
  }

  addClass(elem: Element, className: string) {
    if (!this.hasClass(elem, className)) {
      elem.className += ' ' + className;
    }
  }

  removeClass(elem: Element, className: string) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (this.hasClass(elem, className)) {
      while (newClass.indexOf(' ' + className + ' ') >= 0) {
        newClass = newClass.replace(' ' + className + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  }
viewPropsal(){
  this.ProposalData.viewProposalStatus(this.customerId, this.proposalNumber).subscribe((res: any) => {
   this.viewData = res?.data;
  });
}

RegisterSuccessfulPopup(type: string): void{
  const proposalId =JSON.parse(sessionStorage.getItem('proposalId') ?? 'null');
  this.ProposalData.registrationRemindnow(proposalId).subscribe((res: any) => {
    if(res?.error == false){
      this.matDialog.open(ReminderSentPopupComponent,{
        data:{type, name:this.viewData.customerName}
      })
    }
   });
 
}
KycReminderPopup(type: string): void{
 
  this.matDialog.open(ReminderSentPopupComponent,{
    data:{type, name:this.viewData.customerName}
});
}
proposalAcceptance(type: string): void{
  const proposalId =JSON.parse(sessionStorage.getItem('proposalId') ?? 'null');
  const data = {
    customerId: this.customerId,
    proposalId: proposalId,
    proposalNumber:this.proposalNumber,
}
this.registerService.resendProposalLink(data).subscribe((res:any) =>{
if(res?.error == false){
  this.matDialog.open(ReminderSentPopupComponent,{
    data:{type, name:this.viewData.customerName}
  })
}
});
}
}
