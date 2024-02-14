import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UploadImagePopupComponent } from './upload-image-popup/upload-image-popup.component';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SideNavSectionComponent } from 'src/app/shared/side-nav-section/side-nav-section.component';
import { SidenavComponent } from '../sidenav.component';
import { KycdocumentsPopupComponent } from 'src/app/kycdocuments-popup/kycdocuments-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  panelOpenState = false;
  loginUserId:string = '';
  distributorData: any = [];
  distributorAadharFront:any;
  distributorAadharBack:any;
  distributorPanFront:any;
  distributorCancelledCheque:any;
  distributorBankStatement:any;
  distributorAadharFrontUrl: any;
  distributorAadharBackUrl: any;
  distributorPanFrontUrl: any;
  distributorCancelledChequeUrl: any;
  distributorBankStatementUrl: any;
  distributorProfilePic: any;
  takepic: any;
  profilePhoto: any;

  constructor(private bottomSheet: MatBottomSheet , private registerService:RegisterServiceService ,
    private dialog:MatDialog , private router:Router) { }
  ngOnInit():void{
    this.getDistributorDetails();
    // this.distributorProfilePic = (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='PHOTO').s3FileName) || null
   
    // const storedTakepic = localStorage.getItem('takepic');
    // if (storedTakepic) {
    //   this.takepic = JSON.parse(storedTakepic);}
    //   // console.log( this.takepic,'finalupload')

    //   const uploadedpic = localStorage.getItem('profilePhoto');
    // if (uploadedpic) {
    //   this.takepic = JSON.parse(uploadedpic);}

  }
  camera() {
    this.bottomSheet.open(UploadImagePopupComponent);
  }

  openBottomSheet(type: string): void {
    const bottomSheetRef = this.bottomSheet.open(UploadImagePopupComponent, {
      data: type,
      panelClass: 'custom-fixed-bottom-sheet',
    });
    bottomSheetRef.afterDismissed().subscribe((ressult) => {
      if (ressult === 'uploaded') {
      }
    })
  }

  getDistributorDetails(){
      this.loginUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    this.registerService.distributerStatus(this.loginUserId).subscribe({
      next: (res) => {
        this.distributorData = res?.data;
    this.distributorProfilePic = (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='PHOTO').s3Url) || null
    console.log( this.distributorProfilePic);
       
    this.distributorAadharFront = (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='AADHAR_FRONT_IMG').s3FileName.replace(/^\d+_/, '')) || null
        this.distributorAadharBack = (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='AADHAR_BACK_IMG').s3FileName.replace(/^\d+_/, '')) || null
        this.distributorPanFront = (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='PAN_CARD').s3FileName.replace(/^\d+_/, '')) || null
        this.distributorCancelledCheque = (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='BANK_CHEQUE').s3FileName.replace(/^\d+_/, '')) || null
        // this.distributorBankStatement = (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='BANK_STATEMENT').s3FileName.replace(/^\d+_/, '')) || null

        this.distributorAadharFrontUrl = (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='AADHAR_FRONT_IMG').s3Url) || null
        this.distributorAadharBackUrl = (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='AADHAR_BACK_IMG').s3Url) || null
        this.distributorPanFrontUrl = (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='PAN_CARD').s3Url) || null
        this.distributorCancelledChequeUrl= (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='BANK_CHEQUE').s3Url) || null
        // this.distributorBankStatementUrl = (this.distributorData.documents && this.distributorData.documents.find((doc:any)=>doc.documentType ==='BANK_STATEMENT').s3Url) || null
        // console.log(this.distributorData);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openMenu(){
    this.dialog.open(SidenavComponent)
  }
  kycDocuments(documentType: string, imageUrl: string) {
    if (imageUrl && imageUrl.toLowerCase().includes('.pdf')) {
      window.open(imageUrl, '_blank');
    } else {
      this.dialog.open(KycdocumentsPopupComponent, {
        height: '376px',
        width: '329px',
        data: { documentType, imageUrl }
      });
    }
  }
  navigateToRegister(){
    this.router.navigate(['./register'] , {queryParams : {editDetails: true}})
  }
}