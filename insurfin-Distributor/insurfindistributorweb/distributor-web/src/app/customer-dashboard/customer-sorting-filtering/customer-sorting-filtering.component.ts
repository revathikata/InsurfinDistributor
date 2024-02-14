import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilterSortingBottomsheetComponent } from '../filter-sorting-bottomsheet/filter-sorting-bottomsheet.component';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-sorting-filtering',
  templateUrl: './customer-sorting-filtering.component.html',
  styleUrls: ['./customer-sorting-filtering.component.css']
})
export class CustomerSortingFilteringComponent {
  customerSorting = true
  searchCustomer = false
  distributorId: any;
  AllCustomerList: any[] = [{}];
  newList :any[] = [{}];
  filteredList :any[] =[{}]
  filteredArray: any[] = [];
  filterString: string = '';
  searchText = '';
  selectedSortingOption: string = 'alphabetical';
  customerProfile: any;

  constructor(private bottomSheet: MatBottomSheet, 
    private router: Router, private registerService: RegisterServiceService, private dialog: MatDialog) { }
 
    ngOnInit(): void {
    this.allCustomerList()
    const storedData = JSON.parse(sessionStorage.getItem('sortfunctionality')??'null');
    if (storedData) {
      const { option, additionalParam } = storedData;
      this.selectedSortingOption = additionalParam;
      // console.log(this.selectedSortingOption);
    }
  }

  newProposal() {
    this.customerSorting = false;
    this.searchCustomer = true
  }
  openBottomSheet(documentType: string): void {
    this.bottomSheet.open(FilterSortingBottomsheetComponent, {
      data: documentType,
      panelClass: 'custom-fixed-bottom-sheet',
    });
  }
  allCustomerList() {
    // this.distributorId = JSON.parse(localStorage.getItem('getdistributorId') ?? '');
    this.registerService.getCustomerInfoById().subscribe((res: any) => {
      this.AllCustomerList = res?.data;
      console.log(this.AllCustomerList);
      // Add the following code to format PAN number in each customer object
      this.AllCustomerList.forEach((customer: any) => {
        customer.panNumberFormatted = this.maskPanNumber(customer.panNumber);
      });
    });
  }

  maskPanNumber(panNumber: string): string {
    const maskedPart = '*'.repeat(panNumber.length - 4);
    const lastThreeDigits = panNumber.slice(-4);
    return maskedPart + lastThreeDigits;
  }
  // applyFilter(items: any,searchText){
  //   searchText = searchText.toLowerCase();

  //   return items.filter( item => {
  //     return item.toLowerCase().includes(searchText);
  //   });
  // }
  sidebar() {
    this.dialog.open(SidenavComponent);
  }

   //search function
   searchCustomers() {
    const searchText = this.searchText.trim().toLowerCase();

    if (!searchText) {
      // If searchText is empty, return the original AllCustomerList array
      return this.AllCustomerList;
    }

    return this.AllCustomerList.filter(customer => {
      const customerName = customer?.fullName?.toLowerCase() || '';
      const panNumber = customer?.panNumber?.toLowerCase() || '';
      return (
        customerName.includes(searchText) ||
        panNumber.includes(searchText)
      );
    });
  }

  filterCustomerList() {
    let filter = JSON.parse(sessionStorage.getItem('sortdata') ?? 'null')
    this.filteredList = []
    if (!filter) {
      return this.AllCustomerList;
    }
    // this.newList = []
    this.newList = this.AllCustomerList.filter(x =>
      (x.emailLinkVerified === false && filter?.options['Email Verification Pending'] === true) ||
      (x.registrationCompleted === false && filter?.options['Registration Pending'] === true) ||
      (x.registrationCompleted === true && filter?.options['Registration Completed'] === true)
    );
    this.newList.forEach(ss => {
      this.filteredList.push(ss);
    }
    );
    return this.filteredList;
  }
  

  // Method for sorting based on selectedSortingOption
  sortCustomers(data: any[], sortingOption: string) {
    const sortedData = [...data];

    switch (sortingOption) {
      case 'alphabetical':
        sortedData.sort((a: any, b: any) => a.fullName.localeCompare(b.fullName));
        break;
      // case 'EMIs':
      //   sortedData.sort((a: any, b: any) => b.emisOutstanding - a.emisOutstanding);
      //   break;
      case 'ClosesttoFarthest':
        sortedData.sort((a: any, b: any) => a.registrationCompletedDate?.localeCompare(b.registrationCompletedDate));
        break;
      default:
        // Default sorting option
        //sortedData.sort((a: any, b: any) => a.premiumAmount - b.premiumAmount);
        break;
    }
    return sortedData
  
  }

  get customerSearch() {
    let filteredData = this.filterCustomerList();
    filteredData = this.sortCustomers(filteredData, this.selectedSortingOption);
    return filteredData;
  }
  // Triggered when the search text changes
  onSearchTextChange() {
    this.customerSearch;
  }

  // Triggered when the user clicks on the sort buttons
  onSort(sortingOption: string) {
    this.selectedSortingOption = sortingOption;
    this.customerSearch;
  }

  // get customerSearch(){
    
  //   if (!this.AllCustomerList) {
  //     return [];
  //   }
  //   if (!this.AllCustomerList || this.searchText.trim() === '') {
  //     return this.AllCustomerList;
  //   }
  
  //   const searchText = this.searchText.trim().toLowerCase();
  
  //   return this.AllCustomerList.filter(customer => {
  //     const customerName = customer?.customerName || '';
  //     return customerName.toLowerCase().includes(searchText);
  //   });
  // }
  notificationPage(){
    this.router.navigate(['./notifications'])
  }
  arrowClick(uuid:string){
    this.router.navigate(['/new-customer'],{queryParams:{customerId:uuid}})
  }
}
