import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposal-successfull',
  templateUrl: './proposal-successfull.component.html',
  styleUrls: ['./proposal-successfull.component.css']
})
export class ProposalSuccessfullComponent {
  constructor(private router : Router){}
  
  navigateToDashBoard(){
    this.router.navigate(['/distributor-dashboard'])
  }
  navigateToProposalDetails(){
    this.router.navigate(['/personal-details'])
  }

}
