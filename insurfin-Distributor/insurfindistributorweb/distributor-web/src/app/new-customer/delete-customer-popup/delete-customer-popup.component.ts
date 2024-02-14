import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-customer-popup',
  templateUrl: './delete-customer-popup.component.html',
  styleUrls: ['./delete-customer-popup.component.css']
})
export class DeleteCustomerPopupComponent {
  userName:any;
  constructor(){

  }
ngOnInit(){
   this.userName=JSON.parse(sessionStorage.getItem('customersName') ??'')
}
}
