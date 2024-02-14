import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})



export class NotificationsComponent {
  verify: boolean=true;
  getNotification = true
  constructor() { }

  exponantial(){
this.verify=false
  }
  backspacearrow(){
    this.verify=true
  }
  markAsRead(){
    this.getNotification = false
  }
}
