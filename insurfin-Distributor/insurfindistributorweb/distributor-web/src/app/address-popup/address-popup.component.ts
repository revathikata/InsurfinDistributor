import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-address-popup',
  templateUrl: './address-popup.component.html',
  styleUrls: ['./address-popup.component.css']
})
export class AddressPopupComponent {

  constructor(private dialogRef: MatDialogRef<any>, private router: Router) { }


  // yes() {
    
  //   // this.router.navigate(['/new-customer']);
  //   // const selectedIndextab: any = JSON.parse(localStorage.getItem('selectedIndex') ?? '');
  //   // console.log('tab', selectedIndextab);
  // }
  geoButtonClicked(type){
    this.dialogRef.close(type);
  }
}
