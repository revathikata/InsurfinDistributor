import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddressPopupComponent } from '../address-popup/address-popup.component';
import { RegisterServiceService } from '../services/register-service.service';

@Component({
  selector: 'app-location-popup',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.css']
})
export class LocationPopupComponent {
  lat;
  lng;
  constructor(private dialog: MatDialog,public dialogRef: MatDialogRef<LocationPopupComponent>,private registerService: RegisterServiceService,) { }
  allowLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log("latitude = ", this.lat, "longitude = ", this.lng, "location");

        this.registerService.getCurrentAddressUsingLATLONG(this.lat,this.lng).subscribe({
          next:(res)=>{
            // console.log(res);
            this.dialogRef.close(res);
          },
          error:(err)=>{
            // console.log(err);
            this.dialogRef.close(null);
          }
        })
     });

    } else {
      // console.log("User not allow");
      alert("User has not given permission for accessing location");

    }
    // this.dialog.open(AddressPopupComponent);
  }

}
