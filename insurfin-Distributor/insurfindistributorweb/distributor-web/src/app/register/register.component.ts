import { HttpEventType } from '@angular/common/http';
import { Component, LOCALE_ID } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { RegisterServiceService } from '../services/register-service.service';
// import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmailSuccessPopupComponent } from './email-success-popup/email-success-popup.component';
import { WebCamComponent } from './web-cam/web-cam.component';
import * as stateNames from '../../assets/stateNames.json'
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DeleteUploadedFileComponent } from '../delete-uploaded-file/delete-uploaded-file.component';
import { SharedService } from '../services/shared.service';
import { CaptchaComponent } from './captcha/captcha.component';
import { PleaseConfirmPersonalDetailsPopupComponent } from './please-confirm-personal-details-popup/please-confirm-personal-details-popup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  stateName: any = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli",
    "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
    "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]
  gendername: any = [
    "Male",
    "Female",
    "Others"
  ]
  state: any;
  statess: any = stateNames;
  otpInputConfigEmail: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    // behavior:1,
    classList: {
      inputBox: 'otps',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disabled-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class'
    }
  }
  emailVerifySection: boolean = false;
  registerForm!: FormGroup
  currentAddress!: FormGroup
  permanentAddress!: FormGroup
  aadhaarForm!: FormGroup
  panCard!: FormGroup
  bankDetails!: FormGroup
  panelOpenState = false;
  openPanel1 = true
  openPanel2 = true
  permanent = false;
  AdressPanel = true;
  AdressPanel1 = false
  AdressPanel2 = false
  selecetdFile: any;
  imagePreview: any;
  imgname: any;
  barwidth: any;
  lastStep: boolean = true;
  profileUploaded = "";
  AdharFrontUploaded = ""
  AdharBackUploaded = "";
  PanUploaded = "";
  BankUploaded = "";
  AADHAR_BACK_IMG = ""
  documentIds: any = [];
  profilePhoto: any;
  addImgpreview: boolean = false;
  imagAdded: any;
  imagePrevieww: any;
  AdharBack: any;
  Adharimgback: any;
  pancardupload: any;
  pancardImg: any;
  bankChequeUpload: any;
  bankImg: any;
  countryDisabled: boolean = true;
  selectedIndex: number = 0;
  currentaddress: any;
  gstNumber: any;
  currentDate: any = new Date();
  otpfillemail: any;
  stateNames: any = [];
  stattt: any;
  stat: any;
  takepic: any;
  getemail: any;
  getphonenumber: any;
  userExist: any = []
  fullname: any;
  aadharFront = false
  aadharBack = false
  pancard = false
  cancelcheque = false
  // Dob:any;
  loginUserId: string = '';
  userData: any;
  documentTypes: any[] = [];
  ApprovedStatusError: any = [];
  otpmessage: any;
  isUploaded: boolean = false;
  showbtn: boolean = false
  imgnameStatus: any;
  panimg: any;
  bankinfo: any
  deleteImg: boolean;
  pandel: boolean;
  aadhardel: boolean;
  errorMsg: any;
  isEditDetails: any;
  restrictEdit: Boolean = false;
  viewprofile: any;
  isEmailVerified: boolean = false;
  panVerification: any;
  captchaBase64: string = '';
  tokenValid: any;
  aadharVerified: boolean = false;
  localStorageData: any;
  banVerifiedMsg: any;
  bankLocalStorage: any;
  bankError: any;
  AadharError: any;
  checkSameAddress: any;
  panDetails: any;
  panVerificationError: any;
  disabledState: boolean;
  validAadhar: any;
  routeData: any;
  formFeildError: string;
  data: any = null;
  getEmail: any;
  getUserId: any;
  getName: any;
  panNameError: any;
  persnalData: any;
  AadharNameError: any;
  
  isCheckboxChecked: boolean = false;
  addressEmptyField: any;
  formattedDate: string;
  bankResponseData: any;
  constructor(private formBuilder: FormBuilder, private router: Router,
    public dialog: MatDialog,
    private registerService: RegisterServiceService,
    private sharedService: SharedService, private activatedRoute: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const userData = navigation.extras.state['userData'];
      this.data = userData;

    }
    
  }

  ngOnInit(): void {
    this.getphonenumber = JSON.parse(sessionStorage.getItem('SetPhoneNumber') ?? 'null');
    this.getEmail = JSON.parse(sessionStorage.getItem('setEmail') ?? 'null');
    this.fullname = JSON.parse(sessionStorage.getItem('SetName') ?? 'null');
    // this.selectedIndex = Number(localStorage.getItem('selectedIndex')) || 0;
    this.selectedIndex = this.sharedService.getTab()
    this.showbtn = this.sharedService.disablebtn()

    this.registerForm = this.formBuilder.group({
      fullname: ["" || this.fullname, [Validators.required, Validators.pattern("^\\S.[a-zA-Z_ ]*$")]],
      dob: ["", Validators.required],
      gender: [, Validators.required],
      email: ["" || this.getEmail, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phnnum: ["" || this.getphonenumber, [Validators.required, Validators.pattern("^((\\+91-? ?)|0)?[6-9]{1}[0-9]{9}$")]],
      pan: ["", [Validators.required, Validators.pattern("^([A-Z]){5}([0-9]){4}([A-Z]){1}$")]],
      aadhaarNumber: ["", [Validators.required, Validators.pattern("^[2-9]{1}[0-9]{3}(\\s*[0-9]{4}\\s*){2}$")]],
    });

    this.currentAddress = this.formBuilder.group({
      addressline1: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      addressline2: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      city: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      state: [null, Validators.required],
      country: [{ value: "India", disabled: this.countryDisabled }, Validators.required],
      pincode: ["", [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
      gstNumber: ["", [Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}Z[0-9]{1}$")]],
    }, { validators: checkSameAddress });

    function checkSameAddress(formGroup: FormGroup) {
      const addressline1 = formGroup.get('addressline1')?.value;
      const addressline2 = formGroup.get('addressline2')?.value;

      if (addressline1 && addressline2 && addressline1 === addressline2) {
        formGroup.get('addressline2')?.setErrors({ sameAddress: true });
      }
    }
    this.permanentAddress = this.formBuilder.group({
      paddressline1: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      paddressline2: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      pcity: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      pstate: [null, Validators.required],
      pcountry: [{ value: "India", disabled: this.countryDisabled }, Validators.required],
      ppincode: ["", [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
    }, { validators: checkSamePAddress });

    function checkSamePAddress(formGroup: FormGroup) {
      const paddressline1 = formGroup.get('paddressline1')?.value;
      const paddressline2 = formGroup.get('paddressline2')?.value;

      if (paddressline1 && paddressline2 && paddressline1 === paddressline2) {
        formGroup.get('paddressline2')?.setErrors({ sameAddress: true });
      }
      // else {
      //   formGroup.get('paddressline2')?.setErrors(null);
      // }
    }
    this.aadhaarForm = this.formBuilder.group({
      aadhaarnum: ["", [Validators.required, Validators.pattern("^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$")]],
      aadharfrontimg: ["", Validators.required],
      aadharbackimg: ["", Validators.required],
    });

    this.panCard = this.formBuilder.group({
      pancardnum: ["", [Validators.required, Validators.pattern("^([A-Z]){5}([0-9]){4}([A-Z]){1}$")]],
      panimg: ["", Validators.required]
    });
    this.bankDetails = this.formBuilder.group({
      bankname: ["", [Validators.required, Validators.pattern("^\\S.[a-zA-Z ]*$")]],
      branchname: ["", [Validators.required, Validators.pattern("^\\S.[a-zA-Z ]*$")]],
      ifsc: ["", [Validators.required, Validators.pattern("^[A-Z]{4}0[A-Z0-9a-z]{6}$")]],
      accnum: ["", [Validators.required,]],
      // cancelcheckimg: ["", Validators.required]
    })

    this.registerForm.patchValue({ phnnum: this.getphonenumber });
    this.registerForm.patchValue({ email: this.getEmail });
    this.registerForm.controls['phnnum']?.disable();
    this.registerForm.controls['email']?.disable();
    this.activatedRoute.queryParams.subscribe(editMode => {
      this.isEditDetails = editMode['editDetails']
      if (this.isEditDetails === 'true') {
        this.restrictEdit = true;
        this.selectedIndex = 1;
      }

    })
    this.registerForm.controls['aadhaarNumber']?.disable();
    // local session storage patch value
    if (sessionStorage.getItem('panDetails') !== null) {
      this.panDetails = JSON.parse(sessionStorage.getItem('panDetails') ?? '')
    }
    if (this.panDetails) {
      this.registerForm.patchValue({
        pan: this.panDetails?.pan,
      })
      this.panVerification = this.panDetails?.panVerify
      this.registerForm.controls['pan']?.disable();
      this.registerForm.controls['aadhaarNumber']?.enable();
    }
   
    if (sessionStorage.getItem('bankDetails') !== null) {
      this.bankLocalStorage = JSON.parse(sessionStorage.getItem('bankDetails') ?? '')
    }
    if (this.bankLocalStorage) {
      this.bankDetails.patchValue({
        bankname: this.bankLocalStorage?.bankname,
        branchname: this.bankLocalStorage?.branchname,
        ifsc: this.bankLocalStorage?.ifsc,
        accnum: this.bankLocalStorage?.accnum,
      })
      this.banVerifiedMsg = this.bankLocalStorage?.bankVerify
      this.bankDetails.controls['bankname']?.disable();
      this.bankDetails.controls['branchname']?.disable();
      this.bankDetails.controls['ifsc']?.disable();
      this.bankDetails.controls['accnum']?.disable();
    }
    if (sessionStorage.getItem('checkAddress') !== null) {
      this.checkSameAddress = JSON.parse(sessionStorage.getItem('checkAddress') ?? '')
    }
    if (this.checkSameAddress) {
      this.currentAddress.patchValue({
        addressline1: this.checkSameAddress?.addressline1,
        addressline2: this.checkSameAddress?.addressline2,
        city: this.checkSameAddress?.city,
        state: this.checkSameAddress?.state,
        pincode: this.checkSameAddress?.pincode,
      })
      this.currentAddress.controls['addressline1']?.disable();
      this.currentAddress.controls['addressline2']?.disable();
      this.currentAddress.controls['city']?.disable();
      this.currentAddress.controls['state']?.disable();
      this.currentAddress.controls['pincode']?.disable();
    }

    this.getAaadharVerfied();
    this.AadharNameError = ''
    if (this.data != null) {
      this.AadharNameError = this.data
       
     }
  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }
  isValidEmail() {
    return this.registerForm.controls['email'].valid
  }
  restrictToNumbers(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    input.value = value.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
  }

  PersonalDetailcontinue(e: any) {
    this.selectedIndex = 1
  }
  panValidation(value: any) {
    const panNum = value.target.value.toUpperCase();
    this.registerForm.patchValue({ pan: panNum });
    this.panVerificationError = ''
    this.panNameError = ''
    this.getUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    if (this.registerForm.controls['pan'].valid && this.registerForm.controls['fullname'].valid) {
      const data = {
        pan: this.registerForm.controls['pan'].value,
        fullName: this.registerForm.controls['fullname'].value,
        userId: this.getUserId
      }
      this.registerService.panValid(data).subscribe((res: any) => {
        if (res?.error === false) {
          this.panVerification = res?.message
          this.registerForm.controls['pan']?.disable();
          const panValue = this.registerForm.controls['pan']?.value; // Get the original PAN value
          // const maskedPan = panValue.slice(0, 2) + 'X'.repeat(6) + panValue.slice(-2);
          const maskedPan = 'X'.repeat(6) + panValue.slice(-4);
          this.registerForm.controls['pan'].setValue(maskedPan);
          this.registerForm.controls['aadhaarNumber']?.enable()
          const details: any = {
            // fullname: this.registerForm.controls['fullname'].value,
            pan: this.registerForm.controls['pan'].value,
            panVerify: this.panVerification
          }
          sessionStorage.setItem('panDetails', JSON.stringify(details))
          if (res?.message === 'Name does not match Pan Details') {
            this.panNameError = res?.message
            this.panVerification = 'PAN number verified'
            this.registerForm.controls['pan']?.disable();
            this.registerForm.controls['aadhaarNumber']?.enable();
            const details: any = {
              pan: this.registerForm.controls['pan'].value,
              panVerify: 'PAN number verified'
            }
            sessionStorage.setItem('panDetails', JSON.stringify(details))
          }
        }
        else {
            this.panVerificationError = res?.message
        }
      })

    }
    else {

    }
  }
  isAddressLineEmpty(): boolean {
    const addressLine1Empty = this.permanentAddress.controls['paddressline1'].value === '';
    const addressLine2Empty = this.permanentAddress.controls['paddressline2'].value === '';
  
    // Set the addressEmptyField message if either address line is empty
    if (addressLine1Empty || addressLine2Empty) {
      this.addressEmptyField = 'Permanent address line 1 is empty. So please fill the communication details manually';
    } else {
      this.addressEmptyField = ''; // Reset the message if both address lines are not empty
    }
  
    return addressLine1Empty || addressLine2Empty;
  }
  checkValue(e) {
    this.isCheckboxChecked = true;
    if (e.target.checked) {
      const address1Val = this.permanentAddress.controls["paddressline1"].value;
      const address2Val = this.permanentAddress.controls["paddressline2"].value;
      const cityVal = this.permanentAddress.controls["pcity"].value.replace(/ /g, '');
      const stateVal = this.permanentAddress.controls["pstate"].value;
      // const countryVal = this.currentAddress.controls["country"].value;
      const pincodeVal = this.permanentAddress.controls["ppincode"].value;

      this.currentAddress.controls["addressline1"].setValue(address1Val);
      this.currentAddress.controls["addressline2"].setValue(address2Val);
      this.currentAddress.controls["city"].setValue(cityVal);
      this.currentAddress.controls["state"].setValue(stateVal);
      // this.currentAddress.controls["pcountry"].setValue(countryVal);
      this.currentAddress.controls["pincode"].setValue(pincodeVal);
    }
    else {
      this.currentAddress.controls["paddressline1"]?.setValue('');
      this.currentAddress.controls["paddressline2"]?.setValue('');
      this.currentAddress.controls["pcity"]?.setValue('');
      this.currentAddress.controls["pstate"]?.setValue('');
      // this.currentAddress.controls["pcountry"].setValue('');
      this.currentAddress.controls["ppincode"]?.setValue('');
    }

  }

  currentAddressContinue() {
    if (this.currentAddress.valid) {
      const details = {
        addressline1: this.currentAddress.controls['addressline1'].value,
        addressline2: this.currentAddress.controls['addressline2'].value,
        city: this.currentAddress.controls['city'].value,
        state: this.currentAddress.controls['state'].value,
        pincode: this.currentAddress.controls['pincode'].value,
      }
      sessionStorage.setItem('checkAddress', JSON.stringify(details))
      this.currentAddress.controls['addressline1']?.disable();
      this.currentAddress.controls['addressline2']?.disable();
      this.currentAddress.controls['city']?.disable();
      this.currentAddress.controls['state']?.disable();
      this.disabledState = true
      this.currentAddress.controls['pincode']?.disable();
      this.selectedIndex += 1;
      this.openPanel1 = true
      this.permanent = true

    } else {
      for (const control of Object.keys(this.currentAddress.controls)) {
        this.currentAddress.controls[control].markAsTouched();
      }
      return;
    }

  }

  permanentAddressContinue() {
    const data = {
      address: [
        {
          addressLine1: this.currentAddress.controls['addressline1'].value,
          addressLine2: this.currentAddress.controls['addressline2'].value,
          addressType: 'current',
          city: this.currentAddress.controls['city'].value,
          country: this.currentAddress.controls['country'].value,
          gstNumber: this.gstNumber,
          pinCode: this.currentAddress.controls['pincode'].value,
          state: this.currentAddress.controls['state'].value
        },
        {
          addressLine1: this.permanentAddress.controls['paddressline1'].value,
          addressLine2: this.permanentAddress.controls['paddressline2'].value,
          addressType: 'permanent',
          city: this.permanentAddress.controls['pcity'].value,
          country: this.permanentAddress.controls['pcountry'].value,
          pinCode: this.permanentAddress.controls['ppincode'].value,
          state: this.permanentAddress.controls['pstate'].value
        }
      ]
    }
    if (this.permanentAddress.valid && this.currentAddress.valid && this.isEditDetails !== 'true') {
      this.selectedIndex += 1;
    }
    else if (this.isEditDetails === 'true') {
      this.restrictEdit = true;
      this.router.navigate(['./profile']);
    }
    else {

      for (const control of Object.keys(this.permanentAddress.controls)) {
        this.permanentAddress.controls[control].markAsTouched();
      }
      return;
    }

  }

  addPermanent() {
    if (this.currentAddress.valid) {
      this.openPanel1 = true
      this.permanent = true
    }
    else {
      this.openPanel1 = true
      this.permanent = true
    }
  }

  updatedIds: any[] = []
  // AdharFrontFile(event: any) {
  //   const file = event.target.files[0];
  //   const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  //   if (!allowedFileTypes.includes(file.type)) {
  //     event.target.value = null; // Clear the selected file
  //     alert('Please upload a valid file type (JPEG, PNG, or PDF).');
  //     return;
  //   }
  //   this.selecetdFile = event.target.files[0];
  //   if (this.selecetdFile.size <= 1 * 3064 * 2282) {
  //     this.AdharFronthandleInputChange(this.selecetdFile);
  //     this.imagePreview = true;
  //     this.imgname = event.target.files[0].name;
  //     const formData = new FormData();
  //     formData.append('file', this.selecetdFile)
  //     const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
  //     // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
  //     this.registerService.uploadDocument(loginDetails?.userId, 'AADHAR_FRONT_IMG', formData).subscribe((res: any) => {
  //       res.Adharimgback;
  //       this.documentIds.push(res.documentId);
  //       this.updatedIds.push({ documentId: res.documentId, documentType: "AADHAR_FRONT_IMG" })
  //     });

  //   }
  //   else {
  //     alert('File size should not be greater than 25MB');
  //   }
  //   event.target.value = null;

  // }
  // // adhar front upload
  // AdharFronthandleInputChange(files: any) {
  //   this.imagePrevieww = files
  //   var reader = new FileReader();
  //   reader.onloadend = this.AdharFrontReaderLoaded.bind(this);
  //   reader.readAsDataURL(this.imagePrevieww);

  // }
  // AdharFrontReaderLoaded(e: any) {
  //   let reader = e.target;
  //   this.AdharFrontUploaded = reader.result.substr(reader.result.indexOf(',') + 1);
  //   // console.log(this.AdharFrontUploaded, "adharFront")
  // }
  // // adhar back upload
  // AdharbackUpload(event: any) {
  //   const file = event.target.files[0];
  //   const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  //   if (!allowedFileTypes.includes(file.type)) {
  //     event.target.value = null; // Clear the selected file
  //     alert('Please upload a valid file type (JPEG, PNG, or PDF).');
  //     return;
  //   }
  //   this.AdharBack = event.target.files[0];
  //   this.AADHAR_BACK_IMG = this.AdharBack;
  //   if (this.AdharBack.size <= 1 * 3064 * 2282) {
  //     this.AdharBackhandleInputChange(this.AdharBack);
  //     this.imagePreview = true;
  //     // console.log('imgg', this.AdharBack);
  //     this.Adharimgback = event.target.files[0].name;
  //     // console.log('gh', this.Adharimgback);
  //     const formData = new FormData();
  //     formData.append('file', this.AdharBack)
  //     const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
  //     // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
  //     this.registerService.uploadDocument(loginDetails?.userId, 'AADHAR_BACK_IMG', formData).subscribe((res: any) => {
  //       res.AdharBack;
  //       this.documentIds.push(res.documentId);
  //       this.updatedIds.push({ documentId: res.documentId, documentType: "AADHAR_BACK_IMG" })
  //     });

  //   }
  //   else {
  //     alert('File size should not be greater than 25MB');
  //   }
  //   event.target.value = null;
  // }
  // AdharBackhandleInputChange(files: any) {
  //   this.imagePrevieww = files
  //   var reader = new FileReader();
  //   reader.onloadend = this.AdharBackReaderLoaded.bind(this);
  //   reader.readAsDataURL(this.imagePrevieww);

  // }
  // AdharBackReaderLoaded(e: any) {
  //   let reader = e.target;
  //   this.AdharBackUploaded = reader.result.substr(reader.result.indexOf(',') + 1);
  //   // console.log(this.AdharBackUploaded, "adharBack")
  // }
  // // pan upload
  // pancardUpload(event: any) {
  //   const file = event.target.files[0];
  //   const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  //   if (!allowedFileTypes.includes(file.type)) {
  //     event.target.value = null; // Clear the selected file
  //     alert('Please upload a valid file type (JPEG, PNG, or PDF).');
  //     return;
  //   }
  //   this.pancardupload = event.target.files[0];
  //   if (this.pancardupload.size <= 1 * 3064 * 2282) {
  //     this.PanInputChange(this.pancardupload);
  //     this.imagePreview = true;
  //     // console.log('imgg', this.pancardupload);
  //     this.pancardImg = event.target.files[0].name;
  //     // console.log('gh', this.pancardImg)
  //     const formData = new FormData();
  //     formData.append('file', this.pancardupload)
  //     const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
  //     // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
  //     this.registerService.uploadDocument(loginDetails?.userId, 'PAN_CARD', formData).subscribe((res: any) => {
  //       res.pancardupload;
  //       this.documentIds.push(res.documentId);
  //       this.updatedIds.push({ documentId: res.documentId, documentType: "PAN_CARD" })
  //     });
  //   }
  //   else {
  //     alert('File size should not be greater than 25MB');
  //   }
  //   event.target.value = null;
  // }
  // PanInputChange(files: any) {
  //   this.imagePrevieww = files
  //   var reader = new FileReader();
  //   reader.onloadend = this.PanhandleReaderLoaded.bind(this);
  //   reader.readAsDataURL(this.imagePrevieww);

  // }

  // PanhandleReaderLoaded(e: any) {
  //   let reader = e.target;
  //   this.PanUploaded = reader.result.substr(reader.result.indexOf(',') + 1);
  //   // console.log(this.PanUploaded, "base64 pan")
  // }
  // // bank upload
  // bankupload(event: any) {
  //   const file = event.target.files[0];
  //   const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  //   if (!allowedFileTypes.includes(file.type)) {
  //     event.target.value = null; // Clear the selected file
  //     alert('Please upload a valid file type (JPEG, PNG, or PDF).');
  //     return;
  //   }
  //   this.bankChequeUpload = event.target.files[0];
  //   if (this.bankChequeUpload.size <= 1 * 3064 * 2282) {
  //     this.bankInputChange(this.bankChequeUpload);
  //     this.imagePreview = true;
  //     // console.log('imgg', this.bankChequeUpload);
  //     this.bankImg = event.target.files[0].name;
  //     // console.log('gh', this.bankImg);
  //     const formData = new FormData();
  //     formData.append('file', this.bankChequeUpload)
  //     const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
  //     // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
  //     this.registerService.uploadDocument(loginDetails?.userId, 'BANK_CHEQUE', formData).subscribe((res: any) => {
  //       res.bankChequeUpload;
  //       this.documentIds.push(res.documentId);
  //       this.updatedIds.push({ documentId: res.documentId, documentType: "BANK_CHEQUE" })
  //     });
  //   }
  //   else {
  //     alert('File size should not be greater than 25MB');
  //   }
  //   event.target.value = null;
  // }
  // bankInputChange(files: any) {
  //   this.imagePrevieww = files
  //   var reader = new FileReader();
  //   reader.onloadend = this.BankhandleReaderLoaded.bind(this);
  //   reader.readAsDataURL(this.imagePrevieww);

  // }

  // BankhandleReaderLoaded(e: any) {
  //   let reader = e.target;
  //   this.BankUploaded = reader.result.substr(reader.result.indexOf(',') + 1);
  //   // console.log(this.BankUploaded, "base64 Bank")
  // }
  profileUpload(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.imagAdded = event.target.files[0];
    if (this.imagAdded.size <= 1 * 3024 * 2224) {
      this.handleInputChange(this.imagAdded);
      this.addImgpreview = true;
      // console.log('prof', this.imagAdded);
      const formData = new FormData();
      formData.append('file', this.imagAdded)
      // const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
      this.getUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
      this.registerService.uploadDocument(this.getUserId, 'PHOTO', formData).subscribe((res: any) => {
        res.imagAdded;
        this.profilePhoto = res.documentId

      });
    }
    else {
      alert('File size should not be greater than 20MB');
    }
    event.target.value = null;
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
  removeAadhaarFront(event: Event) {
    this.imgname = ""
    event.preventDefault();
    this.dialog.open(DeleteUploadedFileComponent)
  }
  removeAadhaarBack(event: Event) {
    this.Adharimgback = ""
    event.preventDefault();
    this.dialog.open(DeleteUploadedFileComponent)

  }
  removePanCard(event: Event) {
    this.pancardImg = ""
    event.preventDefault();
    this.dialog.open(DeleteUploadedFileComponent)

  }
  removeCancelCheque(event: Event) {
    this.bankImg = ""
    event.preventDefault();
    this.dialog.open(DeleteUploadedFileComponent)

  }

  removeProfile(event: Event) {
    this.profileUploaded = ""
    event.preventDefault();
    this.addImgpreview = false;
    this.profilePhoto = null;
    this.takepic = null
    this.isUploaded = false;
    this.viewprofile = ''
  }

  docids: any
  kycdocs: any
  // kycContinue() {
  //   if (this.userData?.documents) {
  //     // Regular flow when this.userData.documents is not null
  //     let documents: any[] = [];
  //     const status = this.userData.documents
  //     this.docids = this.documentIds.length < 4
  //     this.userData?.documents?.filter(item => item.documentType !== 'PHOTO')
  //       .map(item => ({
  //         approvalStatus: item.approvalStatus,
  //         documentId: item.documentId,
  //         documentType: item.documentType
  //       }));
  //     documents.push(...status);

  //     const newArray: any = [...this.documentIds];
  //     const updatedArray = documents.map(item => {
  //       const matchingItem = newArray.find(newItem => newItem?.documentType === item.documentType);

  //       if (matchingItem) {
  //         return { ...item, documentId: matchingItem.documentId };
  //       }

  //       return item;
  //     });

  //     this.kycdocs = updatedArray.map(item => item.documentId);
  //   } else {
  //     // Use newArray when this.userData.documents is null
  //     this.kycdocs = [...this.documentIds];
  //   }

  //   const data = {
  //     kycVerification: {
  //       aadhaarNumber: this.aadhaarForm.controls['aadhaarnum'].value.replace(/[^0-9\.]/g, ''),
  //       accountNumber: this.bankDetails.controls['accnum'].value,
  //       bankName: this.bankDetails.controls['bankname'].value,
  //       branchName: this.bankDetails.controls['branchname'].value,
  //       documentIds: this.kycdocs,
  //       ifsccode: this.bankDetails.controls['ifsc']?.value,
  //       panNumber: this.panCard.controls['pancardnum']?.value,
  //     },
  //   };

  //   // const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
  //   this.registerService.DistributerRegister(data, this.loginUserId).subscribe((res) => {
  //     // console.log(res, 'reg');
  //     this.lastStep = false;
  //   });

  //   if (this.aadhaarForm.valid && this.panCard.valid && this.bankDetails.valid) {
  //     this.lastStep = false;
  //   } else {
  //     for (const control of Object.keys(this.registerForm.controls)) {
  //       this.registerForm.controls[control].markAsTouched();
  //     }
  //     return;
  //   }
  // }


  goToPreviousTab() {
    if (this.isEditDetails === 'true') {
      this.selectedIndex = 1
    }
    else if (this.lastStep == false) {
      this.lastStep = true
    }
    else if (this.selectedIndex > 0) {
      this.selectedIndex -= 1
    }
    else {
      // this.router.navigate(['/terms-conditions'])
      this.dialog.open(PleaseConfirmPersonalDetailsPopupComponent, {
        width: '329px'
      });
    }
  }

  // existUserkycContinue() {
  //   let documents: any[] = [];
  //   let status = this.userData.documents
  //     .filter(document => document)
  //     .map(item => ({
  //       approvalStatus: item.approvalStatus,
  //       documentId: item.documentId,
  //       documentType: item.documentType
  //     }));
  //   documents.push(...status);
  //   // console.log('array of documents', documents);

  //   let newArray: any = [...this.updatedIds];
  //   // console.log('new array', newArray);

  //   const updatedArray = documents.map(item => {
  //     // console.log('item.documentType:', item.documentType);

  //     const matchingItem = newArray.find(newItem => newItem?.documentType === item.documentType);

  //     if (matchingItem) {
  //       // console.log('Updating documentId:', matchingItem.documentId);
  //       return { ...item, documentId: matchingItem.documentId };
  //     }

  //     return item;
  //   });


  //   // console.log('updated array', updatedArray);

  //   let documentIds = updatedArray.map(item => item.documentId); // Extract documentIds from updatedArray

  //   let data = {
  //     kycVerification: {
  //       aadhaarNumber: this.aadhaarForm.controls['aadhaarnum'].value.replace(/[^0-9\.]/g, ''),
  //       accountNumber: this.bankDetails.controls['accnum'].value,
  //       bankName: this.bankDetails.controls['bankname'].value,
  //       branchName: this.bankDetails.controls['branchname'].value,
  //       documentIds: documentIds, // Use extracted documentIds
  //       ifsccode: this.bankDetails.controls['ifsc']?.value,
  //       panNumber: this.panCard.controls['pancardnum']?.value,
  //     },
  //   };
  //   // console.log('data:', data);

  //   const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
  //   this.registerService.DistributerRegister(data, loginDetails?.userId).subscribe(
  //     (res) => {
  //       // console.log(res, 'reg');
  //       this.router.navigate(['/registersuccess']);
  //     },
  //     (error) => {
  //       // console.log('Error:', error);
  //     }
  //   );
  // }

  getIndexOfDocument(documentId: any) {
    let index = 0;
    this.ApprovedStatusError.map((element: any, row: any) => {
      if (element.documentId == documentId) {
        index = row;
      }
    })
    return index;
  }
  aadhaeInfo() {
    this.AdressPanel = true
    this.AdressPanel1 = false
    this.AdressPanel2 = false

  }
  panInfo() {
    this.AdressPanel = false
    this.AdressPanel1 = true
    this.AdressPanel2 = false
  }

  bankdetails() {
    this.AdressPanel1 = false
    this.AdressPanel2 = true
    this.AdressPanel = false

  }
  // done() {
  //   let documentIds: any[];

  //   if (this.userData?.documents) {
  //     let documents: any[] = [];
  //     const status = this.userData.documents
  //       .filter(item => item)
  //       .map(item => ({
  //         approvalStatus: item.approvalStatus,
  //         documentId: item.documentId,
  //         documentType: item.documentType
  //       }));
  //     documents.push(...status);
  //     // console.log(documents);

  //     const newArray: any = [...this.documentIds];
  //     const updatedArray = documents.map(item => {
  //       const matchingItem = newArray.find(newItem => newItem?.documentType === item.documentType);

  //       if (matchingItem) {
  //         return { ...item, documentId: matchingItem.documentId };
  //       }

  //       return item;
  //     });

  //     documentIds = updatedArray.map(item => item.documentId);
  //   } else {
  //     documentIds = [...this.documentIds];
  //   }
  //   const data = {
  //     address: [
  //       {
  //         addressLine1: this.currentAddress.controls['addressline1'].value,
  //         addressLine2: this.currentAddress.controls['addressline2'].value,
  //         addressType: 'current',
  //         city: this.currentAddress.controls['city'].value,
  //         country: this.currentAddress.controls['country'].value,
  //         gstNumber: this.gstNumber,
  //         pinCode: this.currentAddress.controls['pincode'].value,
  //         state: this.currentAddress.controls['state'].value,
  //       },
  //       {
  //         addressLine1: this.permanentAddress.controls['paddressline1'].value,
  //         addressLine2: this.permanentAddress.controls['paddressline2'].value,
  //         addressType: 'permanent',
  //         city: this.permanentAddress.controls['pcity'].value,
  //         country: this.permanentAddress.controls['pcountry'].value,
  //         pinCode: this.permanentAddress.controls['ppincode'].value,
  //         state: this.permanentAddress.controls['pstate'].value,
  //       }
  //     ],
  //     kycVerification: {
  //       aadhaarNumber: this.aadhaarForm.controls['aadhaarnum'].value.replace(/[^0-9\.]/g, ''),
  //       accountNumber: this.bankDetails.controls['accnum'].value,
  //       bankName: this.bankDetails.controls['bankname'].value,
  //       branchName: this.bankDetails.controls['branchname'].value,
  //       documentIds: documentIds,
  //       ifsccode: this.bankDetails.controls['ifsc']?.value,
  //       panNumber: this.panCard.controls['pancardnum']?.value,
  //     },
  //     personalDetails: {
  //       dateOfBirth: this.registerForm.controls['dob'].value,
  //       distributorName: this.registerForm.controls['fullname'].value,
  //       email: this.registerForm.controls['email'].value,
  //       gender: this.registerForm.controls['gender'].value,
  //       phoneNumber: this.registerForm.controls['phnnum'].value,
  //     },
  //     photoId: this.profilePhoto || this.takepic
  //   }
  //   // let documents = data.kycVerification.documentIds;
  //   // for (let index = 0; index < 4; index++) {
  //   //     switch (index) {
  //   //       case 0:
  //   //         if(this.AdharFrontUploaded.length != 0){documents.push(this.AdharFrontUploaded
  //   //         )}
  //   //         break;

  //   //       default:
  //   //         break;
  //   //     }
  //   // }
  //   // const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
  //   this.registerService.DistributerRegister(data, this.loginUserId).subscribe((res) => {
  //     // console.log(res, 'reg');
  //     this.router.navigate(['./registersuccess']);
  //     localStorage.setItem('selectedIndex', JSON.stringify(this.selectedIndex += 1))
  //     // sessionStorage.removeItem('username');
  //     // sessionStorage.clear();
  //   })
  // }
  dateChange(e: any) {
    // console.log(this.registerForm.controls['dob']?.value, 'yyyy-MM-dd');
    // this.selectedDate = new Date(e.value).getDate() + '/' + (new Date(e.value).getMonth() + 1) + '/' + new Date(e.value).getFullYear();
    // console.log(this.selectedDate);
  }
  handleOtp(ot: any) {
    // console.log('otpcheck', ot);
    if (parseInt(ot) == 123456) {
      // alert('success');
    }
    else {
      // alert('your otp is wrong')
    }
    this.otpfillemail = ot.join('').length == 6;
  }
  handleFill(value: any) {
    // console.log('otpcheckk', value);
    this.otpfillemail = value;
    // console.log(this.otpfillemail, 'oo')
  }
  capture() {
    const dialogRef = this.dialog.open(WebCamComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.takepic = result;
      this.viewprofile = result.imageAsDataUrl
      if(this.viewprofile){
        this.isUploaded = true;
      }
      const formData = new FormData();
      const blob = takepictur(result._imageAsDataUrl);
      formData.append('file', blob, this.takepic);
      this.registerService.uploadDocument(this.loginUserId, 'PHOTO', formData).subscribe((res: any) => {
        res.result;
        this.profilePhoto = res.documentId
      });
      // const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
      // this.registerService.DistributerRegister(data, loginDetails?.userId).subscribe((res) => {
      //   // console.log(res, 'reg');
      // })
      // console.log(this.takepic, 'jj');

    });
    function takepictur(dataURI) {

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

  statuspending() {
    //  const userId={

    //   }
    const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
    this.registerService.distributerStatus(loginDetails?.userId).subscribe((res: any) => {
      this.fullname = res.data
      // console.log(this.userExist);

    });
  }

  onAadhaarFront() {
    this.aadharFront = true
  }

  onAadhaarBack() {
    this.aadharBack = true
  }

  onPanCard() {
    this.pancard = true
  }

  onCancelCheque() {
    this.cancelcheque = true
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;

    // dialogConfig.data = this.Dob

    const dialogRef = this.dialog.open(DatePickerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.registerForm.patchValue({
          dob: data
        })
      }
      
    );
  }
  checkdobValue(dobValue){
    dobValue = this.registerForm.controls['dob'].value;
    const [day, month, year] = dobValue.split('/');
    this.formattedDate = `${day}/${month}/${year}`;
  }
  onVerify() {
      const data = {
        // aadharNumber : '494825854559'
        aadharNumber: this.registerForm.controls['aadhaarNumber'].value.replace(/[^0-9\.]/g, '')
      }
      console.log(this.registerForm.controls['dob'].value.replace(/\//g, '-'),'dob');
      
      this.registerService.aadharValid(data).subscribe((res: any) => {
        if (res.error == false) {
          this.captchaBase64 = res?.data.captcha,
            this.tokenValid = res?.data.token,
            this.routeData = {
              captcha: this.captchaBase64,
              token: this.tokenValid,
              fullname: this.registerForm.controls['fullname'].value,
              dob: this.registerForm.controls['dob'].value.replace(/\//g, '-'),
              gender: this.registerForm.controls['gender'].value,
              aadharNumber: this.registerForm.controls['aadhaarNumber'].value
            }
            let aadharNumber = this.routeData.aadharNumber
            sessionStorage.setItem('aadharNumber',aadharNumber)
          this.router.navigate(['/captcha'], {
            state:
            {
              userData: this.routeData,
            }
          });
        
          //  dialogRef.afterClosed().subscribe(result => {
          // const result = this.data;
          //   console.log(result);
          //   if (result != null) {
          //     this.aadharVerified = true;
          //     this.permanentAddress.patchValue({
          //       paddressline1: result?.data.house,
          //       paddressline2: result?.data.street,
          //       pcity: result?.data.dist,
          //       pstate: result?.data.state,
          //       pcountry: result?.data.country,
          //       ppincode: result?.data.pc,
          //     })
          //     const AadharValue = this.registerForm.controls['aadhaarNumber']?.value; // Get the original PAN value
          //     const maskedAadhar = 'X'.repeat(8) + AadharValue.slice(8);
          //     this.registerForm.controls['aadhaarNumber'].setValue(maskedAadhar);
          //     // for local store data  
          //     const details: any = {
          //       dob: this.registerForm.controls['dob'].value,
          //       gender: this.registerForm.controls['gender'].value,
          //       email: this.registerForm.controls['email'].value,
          //       aadhaarNumber: this.registerForm.controls['aadhaarNumber'].value,
          //       paddressline1: this.permanentAddress.controls['paddressline1'].value,
          //       paddressline2: this.permanentAddress.controls['paddressline2'].value,
          //       pcity: this.permanentAddress.controls['pcity'].value,
          //       pstate: this.permanentAddress.controls['pstate'].value,
          //       pcountry: this.permanentAddress.controls['pcountry'].value,
          //       ppincode: this.permanentAddress.controls['ppincode'].value,
          //     }
          //     sessionStorage.setItem('persnlDetails', JSON.stringify(details))
          //     this.registerForm.controls['dob']?.disable();
          //     this.registerForm.controls['gender']?.disable();
          //     this.registerForm.controls['aadhaarNumber']?.disable();
          //     this.registerForm.controls['email']?.disable();
          //     this.permanentAddress.controls['paddressline1']?.disable();
          //     this.permanentAddress.controls['paddressline2']?.disable();
          //     this.permanentAddress.controls['pcity']?.disable();
          //     this.permanentAddress.controls['pstate']?.disable();
          //     this.permanentAddress.controls['ppincode']?.disable();
          //   }
          //   else {
          //     this.AadharError = result.message
          //   }

          //   })
        }
        else {
          this.validAadhar = res?.message
        }
      })
    
  }
  bankContinue() {
    this.lastStep = false;
  }

  getAaadharVerfied() {
    if(sessionStorage.getItem('persnlDetails') !== null){
      this.persnalData = JSON.parse(sessionStorage.getItem('persnlDetails') ?? 'null');
      this.aadharVerified = true
      const [day, month, year] = this.persnalData.result?.data.dateOfBirth.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      this.registerForm.patchValue({
        fullname :this.persnalData.result?.data.name,
        gender: this.persnalData.result?.data.gender,
        dob: formattedDate,
        aadhaarNumber:this.persnalData.aadharNumber,
      })
      let addressLine1 = ''
      if (this.persnalData?.result?.data.address.house && this.persnalData?.result?.data.address.street) {
        addressLine1 = `${this.persnalData?.result?.data.address.house}, ${this.persnalData?.result?.data.address.street}`;
      } else if (this.persnalData?.result?.data.address.house || this.persnalData?.result?.data.address.street) {
        addressLine1 = `${this.persnalData?.result?.data.address.house || this.persnalData?.result?.data.address.street}`;
      }
      let addressLine2 = ''
      if (this.persnalData?.result?.data.address.landmark && this.persnalData?.result?.data.address.loc) {
        addressLine2 = `${this.persnalData?.result?.data.address.landmark}, ${this.persnalData?.result?.data.address.loc}`;
      } else if (this.persnalData?.result?.data.address.landmark || this.persnalData?.result?.data.address.loc) {
        addressLine2 = `${this.persnalData?.result?.data.address.landmark || this.persnalData?.result?.data.address.loc}`;
      }
      this.permanentAddress.patchValue({
        paddressline1: addressLine1,
        paddressline2: addressLine2,
        pcity: this.persnalData?.result?.data.address.dist,
        pstate: this.persnalData?.result?.data.address.state,
        pcountry: this.persnalData?.result?.data.address.country,
        ppincode: this.persnalData?.result?.data.address.pc,
      })
         const AadharValue = this.persnalData.aadharNumber;
      const maskedAadhar = 'X'.repeat(8) + AadharValue.slice(8);
      this.registerForm.controls['aadhaarNumber'].setValue(maskedAadhar);
      // this.registerForm.controls['dob'].setValue(this.data.dob);
      // this.registerForm.controls['gender'].setValue(this.data.gender);
      if(this.registerForm.controls['dob'].value !== ''){
        this.registerForm.controls['dob']?.disable();
      }
      if(this.registerForm.controls['gender'].value !== ''){
        this.registerForm.controls['gender']?.disable();
      }
      if(this.registerForm.controls['fullname'].value !== ''){
        this.registerForm.controls['fullname']?.disable();
      }
      if(this.registerForm.controls['aadhaarNumber'].value !== ''){
        this.registerForm.controls['aadhaarNumber']?.disable();
      }
      if(this.registerForm.controls['email'].value !== ''){
        this.registerForm.controls['email']?.disable();
      }
      if(this.permanentAddress.controls['paddressline1'].value !== ''){
        this.permanentAddress.controls['paddressline1']?.disable();
      }
      if(this.permanentAddress.controls['paddressline2'].value !== ''){
        this.permanentAddress.controls['paddressline2']?.disable();
      }
      if(this.permanentAddress.controls['pcity'].value !== ''){
        this.permanentAddress.controls['pcity']?.disable();
      }
      if(this.permanentAddress.controls['pstate'].value !== ''){
        this.permanentAddress.controls['pstate']?.disable();
      }
      if(this.permanentAddress.controls['ppincode'].value !== ''){
        this.permanentAddress.controls['ppincode']?.disable();
      }
    }
  }
  bankDetailsValidity() {
    this.getUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    if (this.bankDetails.valid) {
      const data = {
        bankAccount: this.bankDetails.controls['accnum'].value,
        ifsc: this.bankDetails.controls['ifsc'].value,
        bankName : this.bankDetails.controls['bankname'].value,
        userId: this.getUserId
      }
      this.registerService.BankVerify(data).subscribe((res: any) => {
        if (res?.error == false) {
          this.banVerifiedMsg = res?.message;
          this.bankResponseData = res?.data
          this.bankDetails.patchValue({
            bankname: res?.data.bankName,
        });
          const AccountNumber = this.bankDetails.controls['accnum']?.value; // Get the original PAN value
          const maskedAccount = 'X'.repeat(AccountNumber.length - 4) + AccountNumber.slice(-4);
          this.bankDetails.controls['accnum'].setValue(maskedAccount);
          const details = {
            bankname:res?.data.bankName,
            branchname: this.bankDetails.controls['branchname'].value,
            ifsc: this.bankDetails.controls['ifsc'].value,
            accnum: this.bankDetails.controls['accnum'].value,
            bankVerify: this.banVerifiedMsg
          }
          sessionStorage.setItem('bankDetails', JSON.stringify(details))
          if( this.bankDetails.controls['bankname']?.value !== ''){
            this.bankDetails.controls['bankname']?.disable();
          }
          if( this.bankDetails.controls['branchname']?.value !== ''){
            this.bankDetails.controls['branchname']?.disable();
          }
          if( this.bankDetails.controls['ifsc']?.value !== ''){
            this.bankDetails.controls['ifsc']?.disable();
          }
          if( this.bankDetails.controls['accnum']?.value !== ''){
            this.bankDetails.controls['accnum']?.disable();
          }
        }
        else {
          this.bankError = res?.message
        }

      })
    }
  }
  saveDistributor() {
    const data = {
      address: [
        {
          addressType: "PERMANENT",
          addressLine1: this.permanentAddress.controls['paddressline1']?.value,
          addressLine2: this.permanentAddress.controls['paddressline2']?.value,
          city: this.permanentAddress.controls['pcity']?.value,
          country: this.permanentAddress.controls['pcountry']?.value,
          pinCode: this.permanentAddress.controls['ppincode']?.value,
          state: this.permanentAddress.controls['pstate']?.value,
        },
        {
          addressType: "COMMUNICATION",
          addressLine1: this.currentAddress.controls['addressline1']?.value,
          addressLine2: this.currentAddress.controls['addressline2']?.value,
          city: this.currentAddress.controls['city']?.value,
          country: this.currentAddress.controls['country']?.value,
          gstNumber: this.currentAddress.controls['gstNumber']?.value,
          pinCode: this.currentAddress.controls['pincode']?.value,
          state: this.currentAddress.controls['state']?.value,
        }
      ],
      adhaarVerified: true,
      bankAccountVerified: true,
      distributorName: this.registerForm.controls['fullname']?.value,
      documents: [
        {
          documentId: this.profilePhoto || this.takepic,
          documentType: "PHOTO"
        }
      ],
      email: this.registerForm.controls['email']?.value,
      gender: this.registerForm.controls['gender']?.value,
      panVerified: true,
      phoneNumber: this.registerForm.controls['phnnum']?.value,
    }
    this.getUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    this.registerService.distributorSave(this.getUserId, data).subscribe((res: any) => {
      if (res.error == false) {
        sessionStorage.removeItem('bankDetails');
        sessionStorage.removeItem('persnlDetails');
        sessionStorage.removeItem('checkAddress');
        sessionStorage.removeItem('panDetails');
        sessionStorage.setItem('onBoardingStatus', JSON.stringify('APPROVAL_PENDING'))

      }
      this.router.navigate(['./registersuccess']);
    })
  }

  onInputChange(){
    this.validAadhar='';
    // this.AadharNameError = ''
  }
}


