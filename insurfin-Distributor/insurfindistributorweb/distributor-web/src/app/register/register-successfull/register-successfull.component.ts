import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register-successfull',
  templateUrl: './register-successfull.component.html',
  styleUrls: ['./register-successfull.component.css']
})
export class RegisterSuccessfullComponent {
  pendingmessage: any;
  statusUpadted: any;
  selectedIndex: any;
  selectedIndextab: any;
  isEditDetails :any;
  restrictEdit: Boolean = false;
  onBoardingStatus : any
  constructor(
    public distributerService: RegisterServiceService,
    private router: Router,
    private dialogRef: MatDialogRef<any>,
    private sharedservice:SharedService,private activatedRoute : ActivatedRoute) {}

  ngOnInit(): void {
  this.distributorStatus()
  // this.onBoardingStatus = JSON.parse(sessionStorage.getItem('onBoardingStatus')?? 'null');
  this.activatedRoute.queryParams.subscribe(editMode=>{
  //   this.isEditDetails = editMode['editDetails']
  //   if (this.isEditDetails === 'true') {
  //    this.restrictEdit = true;
  //  }

  })
  }
  // statuspending(){
  // const loginDetailsUserId = JSON.parse(sessionStorage.getItem('UserId')?? '');
  //   this.distributerService.distributerStatus(loginDetailsUserId).subscribe((res: any) =>{
  //      this.pendingmessage = res?.data
  //   });
  // }
  
  editBtn(){
    this.selectedIndextab = 2;
    this.sharedservice.setTab(this.selectedIndextab)
    this.router.navigate(['/register']);
    this.sharedservice.editbtn(JSON.stringify(true))
  }
  getStarted(){
    this.router.navigate(['./setUp-Password']);
  }
  // updateStatus(){
  //   const payload = {

  //   }
  //   const selectedRow: any = JSON.parse(localStorage.getItem('selectedRow') ?? '')
  //   this.distributerService.approvestatus(payload, selectedRow[0]?.distributorId).subscribe((res: any) => {
  //     this.statusUpadted = res;
  //     console.log(res, "status")
  //     // this.fstapprv = this.aadharapproved
  //     // this.dialogRef.close('success');

  //   });
  // }
  updatedBtn(){
    this.router.navigate(['/customer-dashboard']);
  }
  distributorStatus(){
    this.distributerService.distributorStatus().subscribe((res: any) => {
     this.onBoardingStatus = res?.data.distributorOnBoardingStatus
    });
  }
}
