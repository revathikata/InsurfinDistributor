import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RegisterServiceService } from '../services/register-service.service';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { ResendLinkPopupComponent } from './loans-in-process/resend-link-popup/resend-link-popup.component';
import { SharedService } from '../services/shared.service';
import { FilterSortingBottomsheetComponent } from './filter-sorting-bottomsheet/filter-sorting-bottomsheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ReminderSentPopupComponent } from './loans-in-process/more-actions-popup/reminder-sent-popup/reminder-sent-popup.component';
import { MoreActionsPopupComponent } from './loans-in-process/more-actions-popup/more-actions-popup.component';
import { DashboardSortFilterComponent } from '../dashboard-sort-filter/dashboard-sort-filter.component';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CustomerDashboardComponent {
  dropdown: any = [
    "Today", "This week", "This month", "This quarter", "Custom"
  ]

  selectedOption: string = "This week";

  showFiller = false;
  opened = false
  distributorId: any;
  dashboardData: any;
  customerId: any;
  mainDashboard = true
  @ViewChild('datepickerInput') datepickerInput: ElementRef;

  @ViewChild('picker') picker: MatDateRangePicker<Date>
  // readonly ExampleHeaderComponent = ExampleHeaderComponent;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  selectedDate: any;
  // startOfWeek: any;
  // endOfWeek: any;
  startOfMonth: any;
  endOfMonth: any;
  startOfQuarter: any;
  endOfQuarter: any;
  proposalCount: any;

  searchText: string;

  startDate: any;
  endDate: any;
  // proposalId: any;
  AllCustomerList: any[] = [];
  proposalDetail: any;
  proposalListt: any[] = [];
  customerlist: any;
  filteredData: any;
  proposalNumber: any;
  uploadPolicy: any;
  customerIdUpload: any;
  proposalIdUpload: any;
  documentIds: any[] = [];
  s3url: any;
  // showDiv3: boolean = false;
  // isTouchUIActivated = false;
  constructor(
    private router: Router, public dialog: MatDialog,private cdr: ChangeDetectorRef,
    private registerService: RegisterServiceService, private datePipe: DatePipe, private formBuilder: FormBuilder,
    private sharedService: SharedService, private bottomSheet: MatBottomSheet) {
    this.range = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    });

    this.searchText = '';
  }

  selectedSortingOption: string = 'LowtoHigh';
  ngOnInit(): void {
    this.selectedOption = 'This month';
    this.getExactDate();
    const storedData = JSON.parse(sessionStorage.getItem('DashboardSortfunctionality')??'null');
    if (storedData) {
      const { option, additionalParam } = storedData;
      this.selectedSortingOption = additionalParam;
       console.log(storedData);
      // console.log(this.selectedSortingOption);
    }
    
    this.filteredData =JSON.parse(sessionStorage.getItem('Dashboardsortdata')??'null')
    console.log(this.filteredData);
    sessionStorage.removeItem('DashboardSortfunctionality') 
    sessionStorage.removeItem('Dashboardsortdata')
  }
  notificationpage() {
    this.router.navigate(['./notifications'])
  }
  sidebar() {
    // this.mainDashboard=true
    const dialogRef = this.dialog.open(SidenavComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.mainDashboard = false
      }
    })
  }
  distributorDashboardDetails() {
    this.distributorId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    this.registerService.distributorDashboardWithDates(this.distributorId, this.startDate, this.endDate).subscribe((result: any) => {
      this.dashboardData = result;
      this.proposalCount = result.proposalCount;
      this.customerlist = this.dashboardData?.customerList;
      this.proposalListt = [];
      this.customerlist?.forEach((element: any) => {
        this.proposalListt.push(...element.proposalDetailsList);
        this.cdr.detectChanges();
      });
      // console.log(this.customerlist);
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
    count = this.getCountByFeild('PROPOSAL_ACCEPTED') + this.getCountByFeild('PROPOSAL_DROP_OUT') 
    + this.getCountByFeild('PROPOSAL_NOT_ACCEPTED')+ this.getCountByFeild('LOAN_INITIATED');
    return count;
  }
  DelinquentTotalCount() {
    let count;
    count = this.getCountByFeild('SINGLE_EMI') + this.getCountByFeild('DOUBLE_EMI') 
    + this.getCountByFeild('POLICY_CANCELLATION_INITIATED')+ this.getCountByFeild('POLICY_CANCELLED_BY_INSURER');
    return count;
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
  cancel(){
   this.selectedOption === "Custom" 
  }
  onDateRangeClosed(): void {
    const startValue = this.range.get('start')?.value;
    const endValue = this.range.get('end')?.value;
  
    if (startValue === null && endValue === null) {
      setTimeout(() => {
        this.picker.open();
      });
    }
  }
  // const [start, end] = this.calculateDateRange(rangeName);
  // this.picker.select(start);
  // this.picker.select(end);
  // this.picker.close();

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
        this.selectedOption = `${formattedStart} - ${formattedEnd}`  
    }
      
    return `${formattedStart} - ${formattedEnd}`;
  }
  RejectedViewDetails() {
    this.router.navigate(['./loans-rejected']);
    // this.loansRejected=false
  }
  // resendpopup() {
  //   this.dialog.open(ResendLinkPopupComponent)
  // }
  documentPendingView() {
    this.router.navigate(['./loans-in-process'])
  }
  callCustomer() {
    window.location.href = 'tel:+1234567890';
  }
  viewDetails() {
    this.router.navigate(['./total-loans'])
  }

  viewCustomerDetails(details: any) {
    // if(details?.proposalDetailsList?.length > 1) {
    //   this.sharedService.setCustomerProposal(details) ;
    //   this.router.navigate(['./customer-proposal-list/' +details.customerId]);
    // }
    // else{
    // this.router.navigate(['./view-customer-details/' + details.cutomerId + '/' + details.proposalNumber
    // + '/' + details.proposalStatus]);
    sessionStorage.setItem('proposalViewDetails', JSON.stringify(details));
    this.router.navigate(['./view-customer-details/'])
    // }
  }
  openBottomSheet(documentType: string, list): void {
    this.sharedService.setDashboardList(list)
    this.bottomSheet.open(DashboardSortFilterComponent, {
      data: documentType,
      panelClass: 'custom-fixed-bottom-sheet',
    });
    sessionStorage.removeItem('DashboardSortfunctionality') 
    sessionStorage.removeItem('sortDashboardsortdatadata')
  }

  //search function
  searchCustomers() {
    const searchText = this.searchText.trim().toLowerCase();

    if (!searchText) {
      // If searchText is empty, return the original proposalListt array
      return this.proposalListt;
    }

    return this.proposalListt.filter(customer => {
      const customerName = customer?.customerName?.toLowerCase() || '';
      const proposalId = customer?.proposalId?.toLowerCase() || '';
      const premiumAmount = String(customer?.premiumAmount) || '';
      const proposalNumber = customer?.proposalNumber?.toLowerCase() || '';
      const customerId = customer?.cutomerId?.toLowerCase() || '';
      return (
        customerName.includes(searchText) ||
        proposalId.includes(searchText) ||
        premiumAmount.includes(searchText) ||
        customerId.includes(searchText)||
        proposalNumber.includes(searchText)
      );
    });
  }
  // Method for sorting based on selectedSortingOption
  sortCustomers(data: any[], sortingOption: string) {
    const sortedData = [...data];

    sortedData.forEach(customer => {
      customer.premiumAmount = Number(customer.premiumAmount);
    });

    switch (sortingOption) {
      case 'LowtoHigh':
        sortedData.sort((a: any, b: any) => a.premiumAmount - b.premiumAmount);
        break;
      case 'HightoLow':
        sortedData.sort((a: any, b: any) => b.premiumAmount - a.premiumAmount);
        break;
      case 'alphabetical':
        sortedData.sort((a: any, b: any) => a.customerName.localeCompare(b.customerName));
        break;
      case 'EMIs':
        sortedData.sort((a: any, b: any) => b.emisOutstanding - a.emisOutstanding);
        break;
      // case 'ClosesttoFarthest':
      //   sortedData.sort((a: any, b: any) => a.customerName.localeCompare(b.customerName));
      //   break;
      default:
        // Default sorting option
        sortedData.sort((a: any, b: any) => a.premiumAmount - b.premiumAmount);
        break;
    }
    return sortedData;
  }
  get filteredCustomers() {
    let filteredData = this.searchCustomers();
    const options = this.filteredData?.options;
    const functionality = this.filteredData?.functionality;
    const selectedSortingOption = this.selectedSortingOption;
  
    if (functionality === "filter") {
      filteredData = filteredData?.filter(
        customer => Number(customer.premiumAmount) < this.filteredData?.amount
      );
    }
  
    if (options) {
      filteredData = filteredData?.filter(x => {
        if (options['Disbursed Loans'] && x.proposalStatus === "LOAN_DISPURSED") {
          return true;
        }
        if (options['Loans in Process'] && x.proposalStatus === "PROPOSAL_NOT_ACCEPTED") {
          return true;
        }
        if (options['Delinquent Applications'] && x.proposalStatus === "LOAN_DISPURSED") {
          return true;
        }
        if (options['Rejected Loans'] && x.proposalStatus === "LOAN_REJECTED") {
          return true;
        }
        return false;
      });
    }
  
    if (selectedSortingOption) {
      filteredData = this.sortCustomers(filteredData, selectedSortingOption);
    }
  
    return filteredData || this.filteredData; // If no data after filtering, return the original data
  }  
  
  onSearchTextChange() {
    this.filteredCustomers;
  }

  onSort(sortingOption: string) {
    this.selectedSortingOption = sortingOption;
    this.filteredCustomers;
  }

  policyDetailsUploaded() {
    this.sharedService.policy = true
    this.sharedService.policyDetailsUploaded = false
    this.router.navigate(['total-loans'])
    // localStorage.setItem('tab',JSON.stringify(true))
  }
  policyDetailsNotUploaded() {
    this.sharedService.detailsNotUpload = true
    this.sharedService.policyDetailsUploaded = false
    this.router.navigate(['total-loans'])
  }
  customerDropOut() {
    this.sharedService.customerdropout = true
    this.sharedService.loansInProcess = false
    this.sharedService.loanInitiate = false
    this.sharedService.proposalNotAccepted = false
    this.sharedService.proposalAccepted = false
    this.router.navigate(['loans-in-process'])
  }
  proposalNotAccepted() {
    this.sharedService.customerdropout = false
    this.sharedService.loansInProcess = false
    this.sharedService.proposalNotAccepted = true
    this.sharedService.loanInitiate = false
    this.sharedService.proposalAccepted = false
    this.router.navigate(['loans-in-process'])
  }
  proposalAccepted() {
    this.sharedService.customerdropout = false
    this.sharedService.loansInProcess = false
    this.sharedService.proposalNotAccepted = false
    this.sharedService.loanInitiate = false
    this.sharedService.proposalAccepted = true
    this.router.navigate(['loans-in-process'])
  }
  loanInitiate(){
    this.sharedService.customerdropout = false
    this.sharedService.loansInProcess = false
    this.sharedService.proposalNotAccepted = false
    this.sharedService.proposalAccepted = false
    this.sharedService.loanInitiate = true
    this.router.navigate(['loans-in-process'])
  }
  arrowClickDilinquent() {
    this.router.navigate(['delinquent-applications'])
  }
  viewAllTotalLoans() {
    this.sharedService.policy = false
    this.sharedService.detailsNotUpload = false
    this.sharedService.policyDetailsUploaded = true
    this.router.navigate(['total-loans'])
  }

  viewAllLoansInProcess() {
    this.sharedService.loansInProcess = true
    this.router.navigate(['loans-in-process'])
  }
  reminderForDocuments(customers:any) {
    this.proposalNumber = customers.proposalNumber
     // console.log(this.customerId,this.distributorId,this.proposalNumber);
     localStorage.setItem('proposalnumber', JSON.stringify(this.proposalNumber));
     this.dialog.open(ReminderSentPopupComponent,{data:customers})
    //  this.registerService.documentsPendingReminder(this.customerId,this.distributorId,this.proposalNumber).subscribe({
    //    next:(res:any)=>{
    //      console.log(res);
    //    },
    //    error: (err) => {
    //    console.log(err);
    //    }        
    //  }) 
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
  openBottomSheetNotAccept(customers): void {
    console.log(customers);
    // this.customerId = customers.customerId;
    // localStorage.setItem("proposalList", JSON.stringify(customers))
    // this.showDocuments = false
    const bottomSheetRef = this.bottomSheet.open(MoreActionsPopupComponent,{data:customers});
    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result === 'uploaded') {
        this.router.navigate(['loans-in-process'])
        // this.sharedService.showDocuments = true
        this.sharedService.proposalNotAccepted = false
        this.sharedService.loansInProcess = false
      }
    })
  }
  @ViewChild('fileInput') fileInput; openFileExplorer(proposal) {
    this.fileInput.nativeElement.click();
    this.customerIdUpload = proposal.customerId
    this.proposalIdUpload = proposal.proposalId
    this.proposalNumber = proposal.proposalNumber

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
            s3url : res.documentId,
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
  remindNow(type:string,data): void{
    this.dialog.open(ReminderSentPopupComponent,{
      data:type,
    });
    this.registerService.emiNotification(data.cutomerId).subscribe((res =>{
    }))
  }
}
