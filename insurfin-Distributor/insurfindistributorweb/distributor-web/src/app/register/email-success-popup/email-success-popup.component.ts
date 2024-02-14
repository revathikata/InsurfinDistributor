import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-email-success-popup',
  templateUrl: './email-success-popup.component.html',
  styleUrls: ['./email-success-popup.component.css']
})
export class EmailSuccessPopupComponent {

  constructor(
    private http: HttpClient, private router: Router,
    private registerServic: RegisterServiceService,
    private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    
  }
  coninue(){
    // this.dialogRef.close();
//     this.router.navigate(['/register']);
//  const selectedIndextab:any = JSON.parse(localStorage.getItem('selectedIndex')??'');
//  console.log('tab',selectedIndextab);
 
  }
}
