import { Component } from '@angular/core';
import { RegisterServiceService } from '../services/register-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent {

 box=false


  getUserId: any;

  constructor(private registerService : RegisterServiceService,private router: Router,
    ) { }


 termsContinue(){
  // this.router.navigate(['./login'],{ queryParams: {userSignUp:true} })
  this.router.navigate(['./welcome'])
  // this.getUserId = JSON.parse(localStorage.getItem('getuserId') ?? '');
//  const data = {
//   userId: this.getUserId,
//   registrationCompleted: false,
//   termsAndConditionsAccepted: true
// }
// this.registerService.userUpdatedStatus(data).subscribe((res:any) =>{
//   console.log(res);
//   this.router.navigate(['./login'],{ queryParams: {userSignUp:true} })
// });

}
}
