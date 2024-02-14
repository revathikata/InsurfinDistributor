import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { WebcamComponent, WebcamImage, WebcamInitError } from "ngx-webcam";

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.css']
})
export class WebCamComponent {
  readonly imageTrigger: Subject<void> = new Subject<void>();
  error?: string;
  webcamImage : any;

  constructor(private readonly dialogRef: MatDialogRef<WebcamComponent>) {}

  captureImage(webcamImage: WebcamImage): void {
    console.log(webcamImage,'webcam');
    this.webcamImage = webcamImage;
    this.dialogRef.close(webcamImage);
  }

  triggerSnapshot(): void {
    this.imageTrigger.next();
  }

  handleInitError(error: WebcamInitError): void {
    console.warn(error);
    this.error = error.message;
  }

  ngOnDestroy(): void {
    this.imageTrigger.complete();
    console.log("ngOnDestroy completed");
  }

}
