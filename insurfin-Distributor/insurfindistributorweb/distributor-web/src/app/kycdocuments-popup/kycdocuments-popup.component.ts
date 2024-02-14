import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-kycdocuments-popup',
  templateUrl: './kycdocuments-popup.component.html',
  styleUrls: ['./kycdocuments-popup.component.css']
})
export class KycdocumentsPopupComponent {

  documentType: string;
  
  constructor(public dialogRef: MatDialogRef<KycdocumentsPopupComponent>,
    @Inject(MAT_DIALOG_DATA)public data: { documentType: string; imageUrl: string }) {this.documentType = data.documentType;}


  closeDialog(): void {
    this.dialogRef.close();
  }

}
