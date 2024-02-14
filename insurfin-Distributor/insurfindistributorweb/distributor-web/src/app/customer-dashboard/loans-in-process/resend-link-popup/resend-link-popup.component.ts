import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-resend-link-popup',
  templateUrl: './resend-link-popup.component.html',
  styleUrls: ['./resend-link-popup.component.css']
})
export class ResendLinkPopupComponent {
  isCopied:boolean=false;

  constructor( @Inject(MAT_DIALOG_DATA) public resenLink: any){}
  ngOnInit(): void {
  }
  copyUrl() {
    const textField = document.createElement('textarea');
    textField.value = this.resenLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    console.log( this.resenLink);
    this.isCopied=true;
    setTimeout(() => {
      this.isCopied = false;
  }, 3000);
}
}
