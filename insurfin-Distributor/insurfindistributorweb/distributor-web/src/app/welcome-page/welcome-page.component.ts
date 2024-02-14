import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
    getUserId: any;
    constructor(private router :Router,private authService: AuthServiceService, ){}

    ngOnInit(): void {
      
      
    }
    navigateToRegister(){
      this.router.navigate(['./register'])
      this.getUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
      const data = {
          uuid : this.getUserId,
          distributorOnBoardingStatus : "APPLY_AS_ASSOCIATE",
          role : "DISTRIBUTOR"
      }
      this.authService.DistributorOnboarding(data).subscribe((res:any) => {
        this.router.navigate(['./register'])
      });

    }
    
    openMail() {
      const recipient = 'CustomerCare@insurfin.in';
      const subject = encodeURIComponent('[InsurFin] Customer enquiry');
      const body = encodeURIComponent(`To,\nCustomer Care,\nInsurFin,\n\nI am interested in availing premium finance for Insurance. Following are my details:\n\nName:\nAddress:\nPhone Number:`);
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;
  }
  }



