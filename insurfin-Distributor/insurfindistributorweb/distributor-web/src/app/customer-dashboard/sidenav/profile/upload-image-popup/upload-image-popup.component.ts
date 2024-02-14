import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WebcamComponent } from 'ngx-webcam';
import { WebCamComponent } from 'src/app/register/web-cam/web-cam.component';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-upload-image-popup',
  templateUrl: './upload-image-popup.component.html',
  styleUrls: ['./upload-image-popup.component.css']
})
export class UploadImagePopupComponent {
  takepic: any;
  isUploaded: boolean = false;
  imagePrevieww: any;
  imagAdded: any;
  profileUploaded = "";
  profilePhoto: any;
  addImgpreview: boolean = false;
  loginUserId:string = '';
  selectedIndex: number = 0;
  constructor(private bottomSheetRef: MatBottomSheetRef<UploadImagePopupComponent>, public registerservice: RegisterServiceService,private dialog:MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) public type:string,private router:Router) { }
  selectedImage: File | null = null;

  profileImageUrl: string | ArrayBuffer | null = 'path/to/default-image.jpg';
  ngOnInit():void{
  }
  captur() {
    this.loginUserId = JSON.parse(sessionStorage.getItem('UserId')?? 'null');
    const dialogRef = this.dialog.open(WebCamComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.takepic = result
      console.log(JSON.stringify(this.takepic));
      const formData = new FormData();
      const blob = takepictur(result._imageAsDataUrl);
      formData.append('file', blob, this.takepic);
      this.registerservice.uploadDocument(this.loginUserId, 'PHOTO', formData).subscribe((res: any) => {
        res.result;
        this.profilePhoto = res.documentId
      });
      const data = {
        photoId: this.profilePhoto,
      }
      this.registerservice.distributorSave(this.loginUserId, data).subscribe((res:any) => {
        if(res.message === 'Distributor Saved Successfully'){
          window.location.reload()
          this.bottomSheetRef.dismiss()
        }
      })
    });
  function takepictur(dataURI) {
    console.log();
    
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    } 
  }
  
  uploadImage() {
    this.bottomSheetRef.dismiss('uploaded')
  }
  closeSheet() {
    this.bottomSheetRef.dismiss()
  }
  

  resetpassword(){
    this.bottomSheetRef.dismiss()
    this.router.navigate(['/reset-password'])
  }
  openFileExplorer(){
    
  }

  profileUpload(event: any) {
    this.loginUserId = JSON.parse(sessionStorage.getItem('UserId')?? 'null');
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png'];
  
    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG).');
      return;
    }
    this.imagAdded = event.target.files[0];
    if (this.imagAdded.size <= 1 * 3024 * 2224) {
      this.handleInputChange(this.imagAdded);
      this.addImgpreview = true;
    }
    else {
      alert('File size should not be greater than 20MB');
    }
    const formData = new FormData();
      formData.append('file', this.imagAdded)
      this.registerservice.uploadDocument(this.loginUserId, 'PHOTO', formData).subscribe((res: any) => {
        res.imagAdded;
        this.profilePhoto = res.documentId
        if(res.message === 'document uploaded'){
          window.location.reload()
        }
      });
      const data = {
        photoId: this.profilePhoto,
      }
      this.registerservice.distributorSave(this.loginUserId, data).subscribe((res) => {
      })
    event.target.value = null; 
    this.bottomSheetRef.dismiss()
  }

  handleInputChange(files: any) {
    this.imagePrevieww = files
    var reader = new FileReader();
    reader.onloadend = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.imagePrevieww);
    // console.log('PRV', this.imagePrevieww);

  }

  handleReaderLoaded(e: any) {
    let reader = e.target;
    this.profileUploaded = reader.result.substr(reader.result.indexOf(',') + 1);
    // console.log(this.profileUploaded, "base64")
  }
 
}
