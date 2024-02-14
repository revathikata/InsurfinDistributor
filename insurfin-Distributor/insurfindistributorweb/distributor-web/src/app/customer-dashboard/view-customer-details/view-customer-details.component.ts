import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-customer-details',
  templateUrl: './view-customer-details.component.html',
  styleUrls: ['./view-customer-details.component.css'],
})
export class ViewCustomerDetailsComponent implements OnInit {
  distributorId: any;
  customerId: string;
  proposalNumber: string;
  proposalStatus: string;
  userProposalId: any;
  customerDetails: any;
  displayNumber: any;
  showData: boolean = false;
  emiStatus: string;
  emisPaid: string;
  policyDocument :any
  proposalDetails: any;
  allDetails: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerService: RegisterServiceService,
    private http: HttpClient,
    private location: Location
  ) {
    // this.proposalDetails = this.route.snapshot.params['details']
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //   this.veiwProposalDetails()
    //  this.DeliquentView()
    if(sessionStorage.getItem('deliquentViewData')) {
      this.DeliquentView();
    } else {
      this.veiwProposalDetails();
    }
  }
  veiwProposalDetails() {
    const data = JSON.parse(sessionStorage.getItem('proposalViewDetails') ?? 'null');
    this.registerService
      .getpolicydetails(
        data.customerId,
        data.proposalNumber,
        data.proposalStatus
      )
      .subscribe((result: any) => {
        console.log(result);
        this.policyDocument = result.data?.policy?.policyDocument;
        console.log(this.policyDocument);
        this.customerDetails = result?.data;
        this.displayNumber = result?.data?.proposer?.phoneNumber;
        this.userProposalId = result?.data?.policy?.proposalId
      });
    this.registerService.getproposaldetails(data.proposalId).subscribe((res:any) => {
      this.allDetails = res?.data  
      console.log(this.allDetails,'mydata')
    })
  }
  DeliquentView() {
    const data = JSON.parse(sessionStorage.getItem('deliquentViewData') ?? 'null');
    console.log(data);
    this.registerService
      .DeliquentViewdetails(data.emiStatus, data.emisPaid, data.proposalNumber)
      .subscribe((result: any) => {
        this.displayNumber = result?.data?.proposer?.phoneNumber;
        this.customerDetails = result?.data;
      });
  }
  showCustomerPhNumber() {
    if (!this.showData) {
      this.showData = true;
    } else {
      this.showData = false;
    }
  }
  @ViewChild('fileInput') fileInput;
  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event) {
    const selectedFiles = event.target.files;
  }
  back() {
    // this.location.back();
    this.router.navigate(['/distributor-dashboard']);
  }
  navigateToDashboard() {
    this.router.navigate(['/distributor-dashboard']);
  }
  //   displayMblnum(){
  //     this.registerService.getpolicydetails(this.customerId, this.proposalNumber, this.proposalStatus).subscribe((result: any) => {
  //       console.log(result);
  //       this.displayNumber = result?.data?.proposer?.phoneNumber;
  //       console.log('number',this.displayNumber)
  //     this.showData=true;
  //   })
  // }
  downloadPdf(imageUrl : string) {
    if (imageUrl && imageUrl.toLowerCase().includes('.pdf')) {
      this.http.get(imageUrl, { responseType: 'blob' }).subscribe((data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'PolicyDocument.pdf';
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
}