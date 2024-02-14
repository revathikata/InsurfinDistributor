import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterServiceService } from '../services/register-service.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-existing-customer-popup',
  templateUrl: './existing-customer-popup.component.html',
  styleUrls: ['./existing-customer-popup.component.css']
})
export class ExistingCustomerPopupComponent {
  distributorid: any;
  customerId: any;

  constructor(private router:Router, @Inject(MAT_DIALOG_DATA) public dialogData: any,
 private registerService: RegisterServiceService,private sharedservice:SharedService,
 private dialogRef:MatDialogRef<any>){}

 ngOnInit(): void {
  
 }
  proposalFlow(){
    this.distributorid = JSON.parse(sessionStorage.getItem("UserId") ?? 'null')
    this.registerService.LinkDistributorCustomer(this.dialogData.customerId,this.distributorid).subscribe((res:any)=>{
      console.log(res);
      
          })
    this.router.navigate(['./personal-details']);
  }
  navigateToBtn(){
    // const mailtoUrl = 'mailto:test@example.com'; 
    // window.location.href = mailtoUrl;
    this.router.navigate(['./customer-dashboard']);
  }

  onClose(){
    this.dialogRef.close()
  }
}
