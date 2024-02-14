import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MoreActionsPopupComponent } from '../loans-in-process/more-actions-popup/more-actions-popup.component';
import { CallCustomerBottomSheetComponent } from './call-customer-bottom-sheet/call-customer-bottom-sheet.component';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { EditDeletePopupComponent } from './edit-delete-popup/edit-delete-popup.component';
import { PleaseConfirmCustomerpopupComponent } from 'src/app/please-confirm-customerpopup/please-confirm-customerpopup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-total-loan-disbursed',
  templateUrl: './total-loan-disbursed.component.html',
  styleUrls: ['./total-loan-disbursed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalLoanDisbursedComponent {
  dropdown: any = [
    "Today", "This week", "This month", "This quarter", "Custom"
  ]

  selectedOption: string = "This week";
  distributorId: any;
  dashboardData: any;
  proposalDetails: any[] = [];
  customerDetails: any[] = [];
  proposerList: any[] = [];
  proposer: any[] = []
  customerList: any;
  proposalDetailsList: any;
  proposalCount: any;
  @ViewChild('datepickerInput') datepickerInput: ElementRef;

  @ViewChild('picker') picker: MatDateRangePicker<Date>
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  selectedDate: any;
  startOfWeek: any;
  endOfWeek: any;
  startOfMonth: any;
  endOfMonth: any;
  startOfQuarter: any;
  endOfQuarter: any;
  filteredCustomerList: any[] = [];
  startDate: string | null;
  endDate: string | null;
  policyUpload: any[];
  policyDetailsNotUpload: any[];
  uploadPolicy: any;
  documentIds: any[] = [];
  customerId: any;
  proposalId: any;
  loanDisbursedTotal: number = 0;
  proposalNumber: any;
  s3url: any;
  // showDiv3: boolean = false;
  constructor(private _bottomSheet: MatBottomSheet, private router: Router, private route: ActivatedRoute, public sharedService: SharedService, private cdr: ChangeDetectorRef,
    private registerService: RegisterServiceService, private bottomSheets: MatBottomSheet, private dialog: MatDialog, private datePipe: DatePipe, private formBuilder: FormBuilder) {
      this.range = this.formBuilder.group({

        start: [null, Validators.required],

        end: [null, Validators.required]

      });
  }


  panelOpenState!: boolean
  policyDetailsUploaded = true
  policy = false;
  isValid = true
  uploadedCustomer = false
  detailsNotUpload = false;
  notUploadedCustomer = false
  customerdocuments = false
  customerpending = false
  eidtdeletdocuments = false
  selectedCustomerDetails: any;
  selectedCustomerProposalDetails: any;
  ngOnInit(): void {
    // this.policy = localStorage.getItem('tab');
    // this.policyDetailsUploaded = false
    this.selectedOption = 'This month';
    this.getExactDate();
    // this.proposalId = JSON.parse(localStorage.getItem("proposalid")?? '')
    // this.distributorDashboardDetails();
    // this.customerId = JSON.parse(localStorage.getItem("getdistributorId") ?? '');
  }
  openBottomSheet(): void {
    this._bottomSheet.open(CallCustomerBottomSheetComponent);
  }
  @ViewChild('fileInput') fileInput; openFileExplorer(proposal) {
    this.fileInput.nativeElement.click();
    this.customerId = proposal.customerId
    this.proposalId = proposal.proposalId
    this.proposalNumber = proposal.proposalNumber
    // console.log(this.proposalId);

    // console.log(this.fileInput, 'fileupload');

  }
  onFileSelected(event) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.uploadPolicy = event.target.files[0];
    if (this.uploadPolicy.size <= 2000000) {
      // this.imagePreview = true;
      console.log('imgg', this.uploadPolicy);
      // this.imgbank2 = event.target.files[0].name;
      // console.log('gh', this.imgbank2)
      const formData = new FormData();
      formData.append('file', this.uploadPolicy)
      const userId = JSON.parse(sessionStorage.getItem('UserId')??'null');
      this.registerService.customerUploadDocument(userId, 'POLICY_DOCUMENT', formData).subscribe((res: any) => {
        this.documentIds.push(res.documentId);
        this.s3url = res?.S3Url
        if (res.message == "document uploaded") {
          const data = {
            distributorId : this.distributorId,
            proposalNumber :this.proposalNumber,
            documentId : res.documentId,
            status : 'POLICY_UPLOADED'
          }
          this.registerService.uploadPolicy(data).subscribe((res: any) => {
            console.log(res);
          })
        }
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;

  }
  callCustomer() {
    window.location.href = 'tel:+1234567890';
  }

  viewProposalDetails(details: any) {
    this.customerId = details.customerId
    sessionStorage.setItem('proposalViewDetails', JSON.stringify(details));
    this.router.navigate(['./view-customer-details/']);
  }

  policyDetails() {
    this.sharedService.policyDetailsUploaded = false
    this.sharedService.policy = true
  }
  viewDetails() {
    this.policyDetailsUploaded = false
    this.policy = false
    this.uploadedCustomer = true
    this.customerdocuments = false
  }
  detailsNotUploaded() {
    this.sharedService.policyDetailsUploaded = false
    this.sharedService.policy = false
    this.uploadedCustomer = false
    this.sharedService.detailsNotUpload = true

  }
  details() {
    this.notUploadedCustomer = true
    this.detailsNotUpload = false
  }
  backSpace() {
    this.sharedService.policyDetailsUploaded = true
    this.sharedService.policy = false
  }
  arrowBackSpace() {
    this.sharedService.detailsNotUpload = false
    this.sharedService.policyDetailsUploaded = true
  }
  keyBoardBackSpace() {
    this.policy = true
    this.uploadedCustomer = false
  }
  backArrow() {
    this.policyDetailsUploaded = true
    this.detailsNotUpload = false
  }
  keyBoard() {
    this.notUploadedCustomer = false
    this.detailsNotUpload = true
  }
  distributorDashboardDetails() {
    // get distributorId
    this.filteredCustomerList = [];
    this.policyUpload = [];
    this.policyDetailsNotUpload = [];
    this.loanDisbursedTotal = 0;
    this.distributorId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    this.registerService.distributorDashboardWithDates(this.distributorId, this.startDate, this.endDate).subscribe((result: any) => {
      this.dashboardData = result;
      const loanDisbursedList = this.filterCustomerListByFeild('POLICY_NOT_UPLOADED');
      const policyUploadList = this.filterCustomerListByFeild('POLICY_UPLOADED');
      this.filteredCustomerList = [...loanDisbursedList, ...policyUploadList];
      this.policyUpload = policyUploadList;
      this.policyDetailsNotUpload = loanDisbursedList;
      loanDisbursedList.forEach((res) => {
        this.loanDisbursedTotal += Number(res.premiumAmount);
      });
      policyUploadList.forEach((res) => {
        this.loanDisbursedTotal += Number(res.premiumAmount);
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
    count = this.getCountByFeild('POLICY_UPLOADED') + this.getCountByFeild('POLICY_NOT_UPLOADED');
    return count;
  }
  loansINProcessTotalcount() {
    let count;
    count = this.getCountByFeild('') + this.getCountByFeild('DROP_OUT') + this.getCountByFeild('PROPOSAL_NOT_ACCEPTED');
    return count;
  }
  customerlink() {
    this.customerpending = true
    this.customerdocuments = false

  }
  filterCustomerListByFeild(status: string) {

    let list: any[] = [];
    this.dashboardData?.customerList?.forEach((element: any) => {
      if (element) {
        element.proposalDetailsList?.forEach((details, i) => {
          if (details.proposalStatus === status) {
            list.push({ ...element.proposalDetailsList[i], customerId: element.customerId });
          }
        });
      }
    });
    return list;
  }
  bottompopup() {
    this.bottomSheets.open(EditDeletePopupComponent);
    // this.bottomSheets.dismiss();
  }
  customerpopup() {
     this.dialog.open(PleaseConfirmCustomerpopupComponent)
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
    throw new Error('Method not implemented.');
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
  reset() {
    this.selectedOption = 'This week'
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
      this.selectedOption = `${formattedStart}-${formattedEnd}`
    }
    return `${formattedStart} - ${formattedEnd}`;
  }
}
