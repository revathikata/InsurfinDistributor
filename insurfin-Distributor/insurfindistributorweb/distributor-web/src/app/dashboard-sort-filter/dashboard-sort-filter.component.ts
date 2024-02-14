import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-dashboard-sort-filter',
  templateUrl: './dashboard-sort-filter.component.html',
  styleUrls: ['./dashboard-sort-filter.component.css']
})
export class DashboardSortFilterComponent {
  limitReached: boolean = false;
  premiumAmountValue: any;
  constructor( @Inject(MAT_BOTTOM_SHEET_DATA) public documentType: string,
  private bottomsheet: MatBottomSheet,
  private bottomSheetRef: MatBottomSheetRef<DashboardSortFilterComponent>,){}

  ngOnInit(){

  }
  clear() {
    this.bottomSheetRef.dismiss()
  }
  selectOption(option: any, additionalParam: any) {
    console.log(option.target.value, additionalParam);
    sessionStorage.setItem('DashboardSortfunctionality', JSON.stringify({ option: option.target.value, additionalParam }));
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
    'Disbursed Loans': false,
    'Loans in Process': false,
    'Delinquent Applications': false,
    'Rejected Loans': false,
  };
  clearAllFields() {
    this.documentType = 'filtering';
    this.selectedOptions = {
      'Disbursed Loans': false,
      'Loans in Process': false,
      'Delinquent Applications': false,
      'Rejected Loans': false,
      'Select All':false,
    };
    sessionStorage.removeItem('Dashboardsortdata')
    this.premiumAmountValue = 0;
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
  sorting(){
    const sortdata={
      functionality:'filter',
      options:this.selectedOptions,
      amount:this.premiumAmountValue
    }
    sessionStorage.setItem('Dashboardsortdata', JSON.stringify(sortdata))
    // console.log('Selected options:',sortdata);
    this.bottomsheet.dismiss();
    window.location.reload()
    this.checkLimit();
}
  // filterCustomerListByFeild(status: string) {
  //   let list: any[] = [];
  //  list = this.dashboardDetails.customerList.map((res:any) =>{
  //     return res.proposalDetailsList
  //   });
  //   console.log(list);
  // }

  // checkLoanDisbursed(event) {
  //   console.log(event.checked);
  // }
  // LoanInProcess(event) {
  //   console.log(event.checked);
  // }
  // DeliquentLoan(event) {
  //   console.log(event.checked);
  // }
  // RejectLoans(event) {
  //   console.log(event.checked);
  // }
}
