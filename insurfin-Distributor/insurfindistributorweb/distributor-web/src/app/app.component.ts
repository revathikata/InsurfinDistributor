import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'distributor-web';
  @HostListener('document:copy', ['$event'])
  disableCopy(event: ClipboardEvent) {
    event.preventDefault();
    // Optionally, you can show a message or take any other action when copy is attempted
  }

  @HostListener('document:paste', ['$event'])
  disablePaste(event: ClipboardEvent) {
    event.preventDefault();
    // Optionally, you can show a message or take any other action when paste is attempted
  }
}
