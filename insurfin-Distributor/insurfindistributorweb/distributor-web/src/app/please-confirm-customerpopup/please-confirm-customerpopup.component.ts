import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-please-confirm-customerpopup',
  templateUrl: './please-confirm-customerpopup.component.html',
  styleUrls: ['./please-confirm-customerpopup.component.css']
})
export class PleaseConfirmCustomerpopupComponent {

  sucesspopup=false
  pleaseconform=true
  proposaldelete:boolean 
  proposaldetails:any
  customerdelete:any
  customerdetails:any
  deleteError: any;

  constructor(private registerService: RegisterServiceService ,private router: Router,
     private dialogRef :MatDialogRef<PleaseConfirmCustomerpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,){}

  ngOnInit(): void { 
    console.log(this.dialogData);
    
    // this.proposaldelete = localStorage.getItem('deleteprop');
    // if (this.proposaldelete === 'deleteproposal') {
    //   this.proposaldetails = JSON.parse(localStorage.getItem('proposalList') || 'null');
    // } else {
    //   this.customerdelete = localStorage.getItem('delete');
    //   if (this.customerdelete === 'deletecustomer') {
    //     this.customerdetails = JSON.parse(localStorage.getItem('proposalList') || 'null');
    //   }
    // }
    console.log(this.dialogData,'jkjk');
    
  }
  
  sucesspopupmethod(propsalDelete) {
  
    this.pleaseconform = false
    this.registerService.deleteproposal(propsalDelete.proposalNumber).subscribe((result: any) => {
      console.log(result);
      this.sucesspopup = true
    });

    if(this.sucesspopup = true){
      location.reload()
    }
    // if (action === 'proposal') {
    //   console.log('Delete proposal');
    //   const proposalNumber = this.proposaldetails ? this.proposaldetails.proposalNumber : null;
    //   this.registerService.deleteproposal(proposalNumber).subscribe((result: any) => {
    //   });

    // } 
    // else if (action === 'customer') {
    //   console.log('Remove customer');
    //   const customerid = this.customerdetails ? this.customerdetails.customerId : null;
    //   const distributorId = JSON.parse(localStorage.getItem('getdistributorId')??'null')
    //   console.log(customerid,distributorId);
    //   this.registerService.deleteCustomer(this.dialogData.viewDataDelete.uuid,this.dialogData.viewDataDelete.distributorId).subscribe((res:any)=>{
    //   })
    // }
    // setTimeout(() => {
    //   this.dialogRef.close()
    //   location.reload()
    // }, 2000);
  }
    deleteCustomer(deleteCustomer){
      this.registerService.deleteCustomer(this.dialogData.viewDataDelete.uuid,this.dialogData.viewDataDelete.distributorId).subscribe((res:any)=>{
        if(res?.error == false){
          this.dialogRef.close()
          this.router.navigate(['./sorting-filtering']);
        }
        else{
          this.deleteError = res?.message
        }
      });
    }
}
