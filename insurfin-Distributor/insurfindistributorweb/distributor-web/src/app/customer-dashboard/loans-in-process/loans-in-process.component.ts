import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResendLinkPopupComponent } from './resend-link-popup/resend-link-popup.component';
import { MoreActionsPopupComponent } from './more-actions-popup/more-actions-popup.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PleaseConfirmPopupComponent } from 'src/app/please-confirm-popup/please-confirm-popup.component';
import { ConformPopupComponent } from './more-actions-popup/reminder-sent-popup/conform-popup/conform-popup.component';
import { Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { MatDateRangePicker } from '@angular/material/datepicker';
import moment from 'moment';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';
import { ReminderSentPopupComponent } from './more-actions-popup/reminder-sent-popup/reminder-sent-popup.component';
import {Location} from '@angular/common';


@Component({
  selector: 'app-loans-in-process',
  templateUrl: './loans-in-process.component.html',
  styleUrls: ['./loans-in-process.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class LoansInProcessComponent {
  imgfrnt: any;
  updatefilefrnt: any;
  imgback: any;
  updatefileback: any;
  aadharBack: any;
  imgpan: any;
  updatepan: any;
  panfrnt: any;
  updatebankfile: any;
  imgbank: any;
  bankfrnt: any;
  imgbankstatement: any;
  bankstatement: any;
  updatebankstatement: any;
  showDocuments = false
  customerdropout = false
  panelOpenState!: boolean
  loansInProcess = true
  praposalNotAccepted = false
  proposalAccepted = false
  aadharFront = false
  uploaddocumentsform!: FormGroup
  distributorId: any;
  dashboardData: any;
  filteredCustomerList: any[] = [];
  customerId: any;
  salary: boolean = true
  customerList: any;
  startDate: any;
  endDate: any;
  selectedDate: string;
  selectedOption: any;
  customerDropout: any[];
  proposalNotAccepted: any[];
  proposalAccept: any[];
  imgname: any;

  documentIds: any[] = [];
  uploadfileMessage: any;
  aadharbackUploaded: any;
  Panupdatefile: any;
  imgbpan: any;
  pancardUploaded: any;
  updatedbankFile1: any;
  imgbank1: any;
  bankCheque: any;
  updatedbankFile2: any;
  imgbank2: any;
  bankStatementMessage: any;
  documents1: any;
  imgdocument1: any;
  gstCertificateMessage: any;
  documents2: any;
  imgdocument2: any;
  incomeTaxMessage: any;
  documents3: any;
  imgdocument3: any;
  incorporateMessage: any;
  salaryForm: any;
  selfForm: any;
  gstCertificate: any;
  panCard: any;
  cancelCheque: any;
  bankStatement: any;
  incorporation: any;
  incomeTax: any;
  userId: any;
  proposalNumber:any
  proposalList: any[] = [];
  currentlyOpenedPanel: number | null = null;
  getPopup :any;
  loanInProcessTotal: number = 0;
  loanInitiation: any[];

  constructor(public dialog: MatDialog, public dialogref: MatDialog,
    private datePipe: DatePipe,private cdr: ChangeDetectorRef,
    private bottomSheet: MatBottomSheet, private formbuilder: FormBuilder, private dialogeref: MatDialog, private router: Router,
    private registerService: RegisterServiceService, private formBuilder: FormBuilder, public sharedService:SharedService , private location:Location) { }
  @ViewChild('datepickerInput') datepickerInput: ElementRef;
  @ViewChild('picker') picker: MatDateRangePicker<Date>
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  dropdown: any = [
    "Today", "This week", "This month", "This quarter", "Custom"
  ]

  ngOnInit(): void {
    this.selectedOption = 'This month';
    this.getExactDate();
    // this.distributorDashboardDetails();
    this.uploaddocumentsform = this.formbuilder.group({
      adharfront: ["", Validators.required],
      adharback: ["", Validators.required],
      panfront: ["", Validators.required],
      bankfront: ["", Validators.required],
      bankstatement: ["", Validators.required]
    })
    this.selfForm = this.formBuilder.group({
      adharfrontimg: ["", Validators.required],
      adharbackimg: ["", Validators.required],
      pancardimg: ["", Validators.required],
      gstcertificateimg: ["", Validators.required],
      incometaximg: ["", Validators.required],
      incorporationimg: ["", Validators.required]
    });
    this.salaryForm = this.formBuilder.group({
      adharfrontimg: ["", Validators.required],
      adharbackimg: ["", Validators.required],
      pancardimg: ["", Validators.required],
      cancelchequeimg: ["", Validators.required],
      bankstatementimg: ["", [Validators.required]],
    });

  }
  distributorDashboardDetails() {
    // get distributorId
    this.filteredCustomerList = [];
    this.customerDropout = [];
    this.proposalNotAccepted = [];
    this.proposalAccept = [];
    this.loanInProcessTotal = 0;
    this.distributorId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    this.registerService.distributorDashboardWithDates(this.distributorId, this.startDate, this.endDate)
      .subscribe((result: any) => {
        this.dashboardData = result;
        const acceptedList = this.filterCustomerListByFeild('PROPOSAL_ACCEPTED');
        const dropoutList = this.filterCustomerListByFeild('PROPOSAL_DROP_OUT');
        const proposalNotAcceptedList = this.filterCustomerListByFeild('PROPOSAL_NOT_ACCEPTED');
        const LoanInitiateList = this.filterCustomerListByFeild('LOAN_INITIATED');
        this.filteredCustomerList = [...acceptedList, ...dropoutList, ...proposalNotAcceptedList, ...LoanInitiateList];
        this.customerDropout = dropoutList;
        this.proposalNotAccepted = proposalNotAcceptedList;
        this.proposalAccept = acceptedList;
        this.loanInitiation = LoanInitiateList
        acceptedList.forEach((res) => {
          this.loanInProcessTotal += Number(res.premiumAmount);
        });
        dropoutList.forEach((res) => {
          this.loanInProcessTotal += Number(res.premiumAmount);
        });
        proposalNotAcceptedList.forEach((res) => {
          this.loanInProcessTotal += Number(res.premiumAmount);
        });
        this.cdr.detectChanges();
      });
  }
  getCountByFeild(field: any) {
    let i = this.dashboardData?.proposalCount?.findIndex(rec => rec.proposalStatus == field);
    if (i > -1) {
      return this.dashboardData.proposalCount[i].proposalCount;
    }
    else {
      return 0;
    }
  }
  getTotalcount() {
    let count;
    count = this.getCountByFeild('PROPOSAL_DROP_OUT') + this.getCountByFeild('PROPOSAL_NOT_ACCEPTED');
    return count;
  }
  loansINProcessTotalcount() {
    let count;
    count = this.getCountByFeild('PROPOSAL_ACCEPTED') + this.getCountByFeild('PROPOSAL_DROP_OUT') 
    + this.getCountByFeild('PROPOSAL_NOT_ACCEPTED') + this.getCountByFeild('LOAN_INITIATED');
    return count;
  }
  filterCustomerListByFeild(status: string) {

    let list: any[] = [];
    this.dashboardData?.customerList?.forEach((element: any) => {
      if (element) {
        element.proposalDetailsList?.forEach((details, i) => {
          if (details.proposalStatus === status) {
            this.customerId = element.customerId;
            list.push({ ...element.proposalDetailsList[i], customerId:this.customerId})

          }
        });
      }
    });
    return list;
  }
  loansProposalAccepted() {
    this.sharedService.loansInProcess = false
    this.sharedService.proposalAccepted = true
    this.sharedService.proposalNotAccepted = false
    this.sharedService.customerdropout = false
    this.sharedService.loanInitiate = false
  }
  loanInitiated() {
    this.sharedService.loansInProcess = false
    this.sharedService.proposalAccepted = false
    this.sharedService.proposalNotAccepted = false
    this.sharedService.customerdropout = false
    this.sharedService.loanInitiate = true
  }
  customerdrop() {
    this.sharedService.loansInProcess = false
    this.sharedService.proposalAccepted = false
    this.sharedService.customerdropout = true
    this.sharedService.proposalNotAccepted = false
    this.sharedService.loanInitiate = false
  }
  proposalNotAccept() {
    this.sharedService.proposalNotAccepted = true
    this.sharedService.loansInProcess = false
    this.sharedService.proposalAccepted = false
    this.sharedService.customerdropout = false
    this.sharedService.loanInitiate = false
  }

  resendpopup(proposalIdd:any) {
    const data = {
        customerId: proposalIdd.customerId,
        proposalId: proposalIdd.proposalId,
        proposalNumber: proposalIdd.proposalNumber,
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
  reminderForDocuments(proposal:any) {
   this.proposalNumber = proposal.proposalNumber
    // console.log(this.customerId,this.distributorId,this.proposalNumber);
    localStorage.setItem('proposalnumber', JSON.stringify(this.proposalNumber));
    this.dialog.open(ReminderSentPopupComponent,{data:proposal})
    this.registerService.documentsPendingReminder(this.customerId,this.distributorId,this.proposalNumber).subscribe({
      next:(res:any)=>{
        console.log(res);
      },
      error: (err) => {
      console.log(err);
      }        
    }) 
  }
  openBottomSheet(proposal): void {
    this.customerId = proposal.customerId;
    // this.showDocuments = false
    const bottomSheetRef = this.bottomSheet.open(MoreActionsPopupComponent,{data:proposal});
    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result === 'uploaded') {
        this.sharedService.loanInitiate = true
        this.sharedService.proposalNotAccepted = false
        this.sharedService.loansInProcess = false
      }
    })
  }
  AdharFrontFile(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatefilefrnt = event.target.files[0];
    if (this.updatefilefrnt.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      console.log('imgg', this.updatefilefrnt);
      this.imgname = event.target.files[0].name;
      console.log('gh', this.imgname)
      const formData = new FormData();
      formData.append('file', this.updatefilefrnt);
      // const userId = JSON.parse(localStorage.getItem("userId") ?? '');
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
      this.registerService.customerUploadDocument(this.customerId, 'AADHAR_FRONT_IMG', formData).subscribe((res: any) => {
        // res.Adharimgback;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  //adhar back file//

  AdharBackFile(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatefileback = event.target.files[0];
    if (this.updatefileback.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      console.log('imgg', this.updatefileback);
      this.imgback = event.target.files[0].name;
      console.log('gh', this.imgback)
      const formData = new FormData();
      formData.append('file', this.updatefileback);
      // const userId = JSON.parse(localStorage.getItem("loginDetails") ?? '');
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
      this.registerService.customerUploadDocument(this.customerId, 'AADHAR_BACK_IMG', formData).subscribe((res: any) => {
        // res.AdharBack;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  //pan upload//
  PanFrontFile(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.Panupdatefile = event.target.files[0];
    if (this.Panupdatefile.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      console.log('imgg', this.Panupdatefile);
      this.imgbpan = event.target.files[0].name;
      console.log('gh', this.imgbpan)
      const formData = new FormData();
      formData.append('file', this.Panupdatefile);
      // const userId = JSON.parse(localStorage.getItem("userId") ?? '');
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
      this.registerService.customerUploadDocument(this.customerId, 'PAN_CARD', formData).subscribe((res: any) => {
        // res.Adharimgback;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  BankdetailsCheque(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatedbankFile1 = event.target.files[0];
    if (this.updatedbankFile1.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      console.log('imgg', this.updatedbankFile1);
      this.imgbank1 = event.target.files[0].name;
      console.log('gh', this.imgbank1)
      const formData = new FormData();
      formData.append('file', this.updatedbankFile1);
      // const userId = JSON.parse(localStorage.getItem("userId") ?? '');
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
      this.registerService.customerUploadDocument(this.customerId, 'BANK_CHEQUE', formData).subscribe((res: any) => {
        // res.Adharimgback;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  BankdetailStatement(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatedbankFile2 = event.target.files[0];
    if (this.updatedbankFile2.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      console.log('imgg', this.updatedbankFile2);
      this.imgbank2 = event.target.files[0].name;
      console.log('gh', this.imgbank2)
      const formData = new FormData();
      formData.append('file', this.updatedbankFile2);
      // const userId = JSON.parse(localStorage.getItem("userId") ?? '');
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
      this.registerService.customerUploadDocument(this.customerId, 'BANK_STATEMENT', formData).subscribe((res: any) => {
        // res.Adharimgback;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }


  uploadGstCertificate(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents1 = event.target.files[0];
    if (this.documents1.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      console.log('imgg', this.documents1);
      this.imgdocument1 = event.target.files[0].name;
      console.log('gh', this.imgdocument1)
      const formData = new FormData();
      formData.append('file', this.documents1)
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }


  uploadIncomeTax(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents2 = event.target.files[0];
    if (this.documents2.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      console.log('imgg', this.imgdocument2);
      this.imgdocument2 = event.target.files[0].name;
      console.log('gh', this.imgdocument2)
      const formData = new FormData();
      formData.append('file', this.documents2)
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }


  uploadIncorporate(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents3 = event.target.files[0];
    if (this.documents3.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      console.log('imgg', this.imgdocument3);
      this.imgdocument3 = event.target.files[0].name;
      console.log('gh', this.imgdocument3)
      const formData = new FormData();
      formData.append('file', this.documents3)
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }




  onAadhaarFront() {
    this.aadharFront = true
  }
  onAadhaarBack() {
    this.aadharBack = true
  }
  onPanCard() {
    this.panCard = true
  }
  onCancelCheque() {
    this.cancelCheque = true
  }
  onBankStatement() {
    this.bankStatement = true
  }
  onGst() {
    this.gstCertificate = true
  }
  onIncome() {
    this.incomeTax = true
  }
  onIncorporation() {
    this.incorporation = true
  }
  removeAadharFront(event: Event) {
    this.imgname = ""
    event.preventDefault()

  }
  removeAadharBack(event: Event) {
    this.imgback = ""
    event.preventDefault()
  }
  removePan(event: Event) {
    this.imgbpan = ""
    event.preventDefault()
  }
  removeCancelCheque(event: Event) {
    this.imgbank1 = ""
    event.preventDefault()
  }
  removeBankStatement(event: Event) {
    this.imgbank2 = ""
    event.preventDefault()
  }
  removeGst(event: Event) {
    this.imgdocument1 = ""
    event.preventDefault()
  }
  removeIncome(event: Event) {
    this.imgdocument2 = ""
    event.preventDefault()
  }
  removeIncorporation(event: Event) {
    this.imgdocument3 = ""
    event.preventDefault()
  }
  pleaseconformpopup() {
    const dialogref = this.dialog.open(ConformPopupComponent)
    dialogref.afterClosed().subscribe(result => {
      //  this.getPopup =this.sharedService.getConformPopupNavigation
      // console.log(this.getPopup);
      
      if(result === 'yes'){
        // this.sharedService.showDocuments = false  
        this.sharedService.proposalNotAccepted = true
        this.sharedService.loansInProcess = false
      }
     
    })
  }

  backspace() {
    this.sharedService.proposalAccepted = false
    this.sharedService.loansInProcess = true
  }

  customerdropouts() {
    this.sharedService.customerdropout = false
    this.sharedService.loansInProcess = true
  }
  loanInitiatePage() {
    this.sharedService.loanInitiate = false
    this.sharedService.loansInProcess = true
  }
  proposalbackspace() {
    this.sharedService.proposalNotAccepted = false
    this.sharedService.loansInProcess = true

  }
  viewProposalDetails(details: any) {
    sessionStorage.setItem('proposalViewDetails', JSON.stringify(details));
    this.router.navigate(['./view-customer-details/']);
  }


  onDropdownChange() {
    this.getExactDate();
    if (this.selectedOption === "Custom") {
      this.range.reset();
      setTimeout(() => {
        this.picker.open();
      });
    }
  }
  matStartDate(matStartDate: any) {

  }

  getExactDate() {
    let date: string | null = null;
    switch (this.selectedOption) {
      case 'Today':
        date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.startDate = date;
        this.endDate = date;
        break;
      case 'This week':
        const currentWeek = new Date();
        // this.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        // this.endDate = this.datePipe.transform(new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
        this.startDate = this.datePipe.transform(new Date(currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay())), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 6)), 'yyyy-MM-dd');
        date = `${this.startDate} - ${this.endDate}`;
        break;
      case 'This month':
        const currentDate = new Date();
        this.startDate = this.datePipe.transform(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0), 'yyyy-MM-dd');
        date = `${this.startDate} - ${this.endDate}`;
        break;
      case 'This quarter':
        const currentQuarter = this.getCurrentQuarter();
        this.startDate = this.datePipe.transform(
          currentQuarter,
          'yyyy-MM-dd'
        );
        this.endDate = this.datePipe.transform(
          new Date(
            currentQuarter.getFullYear(),
            currentQuarter.getMonth() + 3,
            0
          ),
          'yyyy-MM-dd'
        );
        date = `${this.startDate} - ${this.endDate}`;
        break;
      default:
        date = '';
        break;
    }
    this.selectedDate = (date ?? '')
    // return date ?? '';
    this.distributorDashboardDetails();
  }


  getCurrentQuarter(): Date {
    const currentDate = new Date();
    const quarter = Math.floor(currentDate.getMonth() / 3);
    const startOfQuarter = new Date(currentDate.getFullYear(), quarter * 3, 1);
    return startOfQuarter;
  }
  formatDateEvent(value: string, controlName: string): void {
    const control = this.range.get(controlName);
    const parsedDate = moment(value, 'YYYY-MM-DD', false);
    if (control && parsedDate.isValid()) {
      control.setValue(parsedDate.toDate());
      if (controlName === 'start') {
        this.startDate = this.datePipe.transform(new Date(control.value), 'yyyy-MM-dd');
      } else {
        this.endDate = this.datePipe.transform(new Date(control.value), 'yyyy-MM-dd');
        this.distributorDashboardDetails();
      }
    }
  }
  getFormattedDate(date: Date): string {
    if (!date) {
      return '';
    }

    const formattedDate = moment(date).format('MMM DD');
    return formattedDate;
  }

  getFormattedDateRange(): string {
    const start = this.range?.get('start')?.value;
    const end = this.range?.get('end')?.value;
    if (!start || !end) {
      return '';
    }
    const formattedStart = moment(start).format('MMM DD');
    const formattedEnd = moment(end).format('MMM DD');
    if (this.selectedOption === "Custom") {
      this.selectedOption =`${formattedStart}-${formattedEnd}`
    }
    return `${formattedStart} - ${formattedEnd}`;
  }
  reset(){
    this.selectedOption ='This week'
  }
  // salaryContinue() {
  //   const data = {
  //     customerKycDetails: {
  //       documentIds:
  //         this.documentIds

  //     },
  //   }
  //   this.registerService.UpdateCustomer(this.customerId, data).subscribe((res: any) => {
  //     this.sharedService.showDocuments = false;
  //     this.sharedService.proposalNotAccepted = true

  //   });
  // }
  // selfContinue() {
  //   const data = {
  //     customerKycDetails: {
  //       documentIds: [
  //         this.documentIds
  //       ]
  //     },
  //   }
  //   this.registerService.UpdateCustomer(this.customerId, data).subscribe((res: any) => {
  //     console.log(res);
  //     this.sharedService.showDocuments = false;
  //     this.sharedService.proposalNotAccepted = true

  //   });

  // }
  truncateFileName(fileName: string): string {
    const maxLength = 35;
    if (fileName.length <= maxLength) {
        return fileName;
    } else {
        return fileName.substr(0, maxLength) + '...';
    }
}

panelOpenedState(index: number) {
  this.currentlyOpenedPanel = index;
}

panelClosedState(index: number) {
  if (this.currentlyOpenedPanel === index) {
    this.currentlyOpenedPanel = null;
  }
}

}