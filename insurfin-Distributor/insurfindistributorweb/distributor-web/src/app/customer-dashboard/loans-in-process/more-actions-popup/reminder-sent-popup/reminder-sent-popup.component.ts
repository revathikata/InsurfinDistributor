import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reminder-sent-popup',
  templateUrl: './reminder-sent-popup.component.html',
  styleUrls: ['./reminder-sent-popup.component.css']
})
export class ReminderSentPopupComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public dialogData: any, @Inject(MAT_DIALOG_DATA)  public type:String){
  }
  ngOnInit(): void {
    console.log(this.dialogData);
    
  }
}
