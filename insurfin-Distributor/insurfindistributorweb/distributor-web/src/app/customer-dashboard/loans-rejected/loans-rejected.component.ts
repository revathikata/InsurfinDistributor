import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import moment from 'moment';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-loans-rejected',
  templateUrl: './loans-rejected.component.html',
  styleUrls: ['./loans-rejected.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoansRejectedComponent {
  
  panelOpenState!:boolean
  loansRejected=true
  rejectedDetails=false
  distributorId: any;
  dashboardData: any;
  loansRejectedTotal : number =0
  filteredCustomerList: any[] = [];
  @ViewChild('datepickerInput') datepickerInput: ElementRef;

  @ViewChild('picker') picker: MatDateRangePicker<Date>
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  dropdown:any=[
    "Today","This week","This month","This quarter","Custom"
  ]
  selectedOption: string;
  selectedDate: any;
  startOfWeek: any;
  endOfWeek: any;
  startOfMonth: any;
  endOfMonth: any;
  startOfQuarter: any;
  endOfQuarter: any;
  startDate: string | null;
  endDate: string | null;
  searchText: string;

  constructor( private registerService: RegisterServiceService,private cdr: ChangeDetectorRef,
    private router: Router,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder){ 
      this.range = this.formBuilder.group({
    start: [null, Validators.required],
    end: [null, Validators.required]
  });

  // this.searchText = '';
}
  ngOnInit(): void {
    this.selectedOption = 'This month';
    this.getExactDate();
    // this.distributorDashboardDetails();
  }
  viewDetails(){
    this.loansRejected=false
    this.rejectedDetails=true
  }
  backSpace(){
    this.loansRejected=true
    this.rejectedDetails=false
  }
  distributorDashboardDetails(){
    // getdistributorId
   this.filteredCustomerList= [];
    this.loansRejectedTotal = 0
    this.distributorId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    this.registerService.distributorDashboardWithDates(this.distributorId,this.startDate, this.endDate).subscribe((result: any) => {
      // console.log(result,'fgh');
      this.dashboardData = result;
      this.filteredCustomerList = this.filterCustomerListByFeild('LOAN_REJECTED');
      this.cdr.detectChanges();
      this.filterCustomerListByFeild('LOAN_REJECTED').forEach((res)=>{
         this.loansRejectedTotal  += Number(res.premiumAmount)
         
      })
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
    count = this.getCountByFeild('LOAN_REJECTED') 
    return count;
  }
  // loansINProcessTotalcount() {
  //   let count;
  //   count = this.getCountByFeild('LOAN_REJECTED') 
  //   return count;
  // }
  filterCustomerListByFeild(status:string){
    let list: any[] = [];
    if (this.dashboardData && this.dashboardData.customerList) {
      this.dashboardData.customerList.forEach((element: any) => {
        if (element && element.proposalDetailsList) {
          element.proposalDetailsList.forEach((details: any, i: number) => {
            if (details.proposalStatus === status) {
              list.push({ ...element.proposalDetailsList[i], customerId: element.customerId });
            }
          });
        }
      });
    }
    return list;    
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
      this.selectedOption =`${formattedStart}-${formattedEnd}`
    }
    return `${formattedStart} - ${formattedEnd}`;
  }
  reset(){
    this.selectedOption ='This week'
  }
}
