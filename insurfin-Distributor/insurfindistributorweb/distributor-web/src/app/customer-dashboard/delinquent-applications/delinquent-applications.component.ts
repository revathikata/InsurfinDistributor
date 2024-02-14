import { Component, ElementRef, ViewChild,OnInit} from '@angular/core';
import { CallCustomerBottomSheetComponent } from '../total-loan-disbursed/call-customer-bottom-sheet/call-customer-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delinquent-applications',
  templateUrl: './delinquent-applications.component.html',
  styleUrls: ['./delinquent-applications.component.css']
})
export class DelinquentApplicationsComponent {
  dropdown: any = [
    "Today", "This week", "This month", "This quarter", "Custom"
  ]
  distributorId: any;
  deliquentData: any[] = [{}];
  customerId: any;
  singleEmiStatus: any[] = [];
  doubleEmiStatus: any[] = [];
  policyCancelInitiate: any[] = [];
  policyCancelInsurer: any[] = [];
  constructor(private _bottomSheet: MatBottomSheet,
    private datePipe: DatePipe,private registerService: RegisterServiceService,private router: Router,) {}
    @ViewChild('datepickerInput') datepickerInput: ElementRef;
    @ViewChild('picker') picker: MatDateRangePicker<Date>
    range = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });


  panelOpenState!: boolean
  delinquentApplications = true
  singleEmiOutstanding = false
  doubleEmiOutstanding = false
  policyCancellationInitiated = false
  policyCancelledInsurer=false
  selectedOption:string;
  startDate: any;
  endDate: any;
  selectedDate: string;
  filteredCustomerList: any[] = [];
  deliquentView :boolean = false;
  ngOnInit(): void {
    this.selectedOption = 'This month';
    this.getExactDate();
    // this.getdeliquentApiData();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(CallCustomerBottomSheetComponent);
  }
  singleEmi() {
    this.delinquentApplications = false
    this.singleEmiOutstanding = true

  }
  doubleEmi() {
    this.delinquentApplications = false
    this.singleEmiOutstanding = false
    this.doubleEmiOutstanding = true
  }
  policyCancellation() {
    this.delinquentApplications = false
    this.singleEmiOutstanding = false
    this.doubleEmiOutstanding = false
    this.policyCancellationInitiated=true
  }
  policyCancelledByInsurer(){
    this.delinquentApplications = false
    this.singleEmiOutstanding = false
    this.doubleEmiOutstanding = false
    this.policyCancellationInitiated=false
    this.policyCancelledInsurer=true
  }

  singleEmibackspace(){
    this.singleEmiOutstanding=false
    this.delinquentApplications=true
  }
  doubleEmibackspace(){
    this.doubleEmiOutstanding=false
    this.delinquentApplications=true
  }
  policycancelledbackspace(){
    this.policyCancellationInitiated=false
    this.delinquentApplications=true
  }
  policyinsurerbackspace(){
    this.policyCancelledInsurer=false
    this.delinquentApplications=true
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
    this.getdeliquentApiData()
    // return date ?? '';
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
        // this.distributorDashboardDetails();
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
getdeliquentApiData(){
    this.distributorId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    const data = {
      distributorId :this.distributorId,
      fromDate : this.startDate,
      statuses : [
        "POLICY_CANCELLATION_INITIATED",
        "SINGLE_EMI",
        "DOUBLE_EMI",
        "POLICY_CANCELLED_BY_INSURER"
    ],
      toDate :  this.endDate
    }
    this.registerService.deliquentApi(data).subscribe((result: any) => {
      this.deliquentData = result.data;
      this.singleEmiStatus = this.filterCustomerListByFeild('Single EMI outstanding');
      this.doubleEmiStatus = this.filterCustomerListByFeild('Double EMI outstanding');
      this.policyCancelInitiate = this.filterCustomerListByFeild('Policy cancellation initiated')
      this.policyCancelInsurer = this.filterCustomerListByFeild('Policy cancelled')
      // this.filterCustomerListByFeild()
    });
  }
  filterCustomerListByFeild(status:any) {
    let list: any[] = [];
    this.deliquentData.forEach((element: any) => {
      if(element.displayStatus == status){
      list.push(element)
      }
    });
    return list;
  }
  // getCountByFeild(field: any) {
  //   let i = this.deliquentData?.findIndex(rec => rec.deliquentData == field);
  //   if (i > -1) {
  //     return this.deliquentData[i];
  //   }
  //   else {
  //     return 0;
  //   }
  // }
  // getTotalcount() {
  //   let count;
  //   count = this.getCountByFeild('Single EMI outstanding') + this.getCountByFeild('DOUBLE_EMI') 
  //   + this.getCountByFeild('POLICY_CANCELLATION_INITIATED')+ this.getCountByFeild('POLICY_CANCELLED_BY_INSURER');
  //   return count;
  // }
  viewProposalDetails(proposal){
    this.deliquentView = true;
    sessionStorage.setItem('deliquentViewData',JSON.stringify(proposal))
    this.router.navigate(['./view-customer-details']);
  }
  remindNow(data){
    this.customerId = localStorage.getItem('customerId')
    this.registerService.emiNotification(data.customerId).subscribe((res =>{

    }))
  }
}
