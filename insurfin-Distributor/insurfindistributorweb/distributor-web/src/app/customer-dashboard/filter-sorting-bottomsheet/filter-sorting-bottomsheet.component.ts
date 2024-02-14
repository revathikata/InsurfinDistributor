import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-filter-sorting-bottomsheet',
  templateUrl: './filter-sorting-bottomsheet.component.html',
  styleUrls: ['./filter-sorting-bottomsheet.component.css']
})
export class FilterSortingBottomsheetComponent {
  box = false
  premiumAmountValue: any;
  dashboardDetails: any;
  // loanDisbursed: any;
  loanDisbursedChecked: any;
  LoanInProcessChecked: any;
  DeliquentLoanChecked: any;
  RejectLoansChecked: any;
  isChecked = false;
  checked: boolean = false;
  selected: any
  loanDisbursedstatus: boolean;
  loandisbursed: any[] = [];
  proposalList: any;
  limitReached: boolean = false;

  constructor(private bottomsheet: MatBottomSheet, @Inject(MAT_BOTTOM_SHEET_DATA) public documentType: string,
    private sharedService: SharedService, private location: Location,
    private bottomSheetRef: MatBottomSheetRef<FilterSortingBottomsheetComponent>,
    private router: Router) { }
  ngOnInit(): void {
    this.dashboardDetails = this.sharedService.getDashboardList()
    // console.log(this.dashboardDetails);
    this.dashboardDetails?.customerList?.filter((res: any) => {
      this.proposalList = (res.proposalDetailsList);
    });
    // console.log(this.proposalList);
    this.loandisbursed = this.proposalList?.filter((res: any) => {
      // console.log(res.innerDisplayStatus == 'Loan disbursed successfully');

    })
  }

  clear() {
    this.bottomSheetRef.dismiss()
  }
  selectOption(option: any, additionalParam: any) {
    console.log(option.target.value, additionalParam);
    sessionStorage.setItem('sortfunctionality', JSON.stringify({ option: option.target.value, additionalParam }));
    this.bottomSheetRef.dismiss();
    window.location.reload()
  }
  PremiumAmountValue(event: any) {
    this.premiumAmountValue = event.target.value;
    console.log(this.premiumAmountValue);
  }


  // checkLoanDisbursed(event){
  //   console.log(event.checked); 
  // }
  // LoanInProcess(event){
  //   console.log(event.checked);
  // }
  // DeliquentLoan(event){
  //   console.log(event.checked);
  // }
  // RejectLoans(event){
  //   console.log(event.checked);
  // }
  selectedOptions: { [key: string]: boolean } = {
    'Email Verification Pending': false,
    'Registration Pending': false,
    'Registration Completed': false,
    // 'Rejected Loans': false,
  };
  clearAllFields() {
    this.documentType = 'filter';
    this.selectedOptions = {
      'Email Verification Pending': false,
      'Registration Pending': false,
      'Registration Completed': false,
      'Select All': false,
    };
    sessionStorage.removeItem('sortdata')
    // this.premiumAmountValue = 0;
    // Add other fields that you want to reset to their default values.
  }
  selectBox(option: string) {
    this.selectedOptions[option] = !this.selectedOptions[option];
    this.handleSelectedOptions();
  }

  selectAll(event: any) {
    const checked = event.checked;
    for (const option in this.selectedOptions) {
      this.selectedOptions[option] = checked;
    }
    this.handleSelectedOptions();
  }

  isSelected(option: string) {
    return this.selectedOptions[option];
  }

  handleSelectedOptions() {
    // console.log('Selected options:', this.selectedOptions);
  }
  sorting() {
    const sortdata = {
      functionality: 'filter',
      options: this.selectedOptions,
      // amount: this.premiumAmountValue
    }
    sessionStorage.setItem('sortdata', JSON.stringify(sortdata))
    // console.log('Selected options:',sortdata);
    this.bottomsheet.dismiss();
   // window.location.reload()
    // this.checkLimit();
  }

  restrictToNumbers(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    input.value = value.replace(/[^0-9]/g, '');
  }

  checkLimit() {
    if (parseInt(this.premiumAmountValue) > 100000) {
      this.limitReached = true;
    } else {
      this.limitReached = false;
    }
  }
  // sorting(){
  // this.router.navigate(['/sorting-filtering'])
  // this.loandisbursed = this.dashboardDetails.customerList.filter((res:any,i) =>{
  //   return res.proposalDetailsList[i].proposalStatus == 'PROPOSAL_NOT_ACCEPTED'})
  // console.log( this.loandisbursed);
  // this.loandisbursed.filter((result:any) =>{
  //   console.log(result.proposalDetailsList[in]);

  // })
  //   this.bottomSheetRef.dismiss();
  // }
  // filterCustomerListByFeild(status: string) {
  //   let list: any[] = [];
  //  list = this.dashboardDetails.customerList.map((res:any) =>{
  //     return res.proposalDetailsList
  //   });
  //   console.log(list);
  // }

  checkLoanDisbursed(event) {
    console.log(event.checked);
  }
  LoanInProcess(event) {
    console.log(event.checked);
  }
  DeliquentLoan(event) {
    console.log(event.checked);
  }
  RejectLoans(event) {
    console.log(event.checked);
  }
  // selectAll() {
  //   this.checkLoanDisbursed(this),
  //   this.LoanInProcess(this),
  //   this.DeliquentLoan(this),
  //   this.RejectLoans(this)
  // }

}
