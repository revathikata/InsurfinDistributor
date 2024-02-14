import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PleaseConfirmPopupComponent } from '../please-confirm-popup/please-confirm-popup.component';
import * as stateNames from '../../assets/stateNames.json'
import { RegisterServiceService } from '../services/register-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KycdocumentsPopupComponent } from '../kycdocuments-popup/kycdocuments-popup.component';
import { LocationPopupComponent } from '../location-popup/location-popup.component';
import { AddressPopupComponent } from '../address-popup/address-popup.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { RemoveCurrentaddressComponent } from '../address-popup/remove-currentaddress/remove-currentaddress.component';
import { LocationSuccessComponent } from '../address-popup/location-success/location-success.component';
import { ExistingCustomerPopupComponent } from '../existing-customer-popup/existing-customer-popup.component';
import { SharedService } from '../services/shared.service';
import { DeleteCustomerPopupComponent } from './delete-customer-popup/delete-customer-popup.component';
import { PleaseConfirmCustomerpopupComponent } from '../please-confirm-customerpopup/please-confirm-customerpopup.component';
import { SuccessPopupComponent } from '../customer-details/success-popup/success-popup.component';



@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent {

  stateName: any = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli",
    "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
    "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]
  employee: any = [
    "Self Employed Professional",
    "Self Employed Business",
    "Self Employed Type 3",
    "Self Employed Type 4"
  ]
  Gender: any = [
    "Male",
    "Female",
    "Others"
  ]
  maritalstatus: any = [
    "Single",
    "Married",
    "Widowed/Divorced"
  ]
  // state : any;
  //   statess :any= stateNames;

  communicationAddress!: FormGroup
  permanentAddress!: FormGroup
  currentAddress!: FormGroup
  customerInfoForm!: FormGroup
  salaryEmploymentForm!: FormGroup
  selfEmploymentForm!: FormGroup
  countryDisabled: boolean = true;
  selectedIndex = 0;
  caddress: boolean = true
  paddress: boolean = false
  communicationBtn: boolean = true
  salary: boolean = true
  proposal: boolean = true
  selecetdFile: any;
  imgname: any;
  updatedFile: any;
  imgback: any;
  iselecetdFile: any;
  imgbpan: any;
  updatedbankFile1: any;
  imgbank1: any;
  updatedbankFile2: any;
  imgbank2: any;
  Panupdatefile: any;
  updatefilefrnt: any;
  updatefileback: any;
  salaryForm!: FormGroup
  selfForm!: FormGroup
  dialogRef: any;
  isCustomerEdit = false;
  imgdocument1: any;
  imgdocument2: any;
  imgdocument3: any;
  documents2: any;
  documents3: any;
  documents1: any;
  rupees = '₹'
  distributorid: any;
  customerName: any;
  getallCustomerInformation: any = []
  searchFullName: any;
  customerDetails = true
  customerId: any;
  aadharFront = false
  aadharBack = false
  panCard = false
  cancelCheque = false
  bankStatement = false
  incorporation = false
  incomeTax = false
  gstCertificate = false
  documentIds: any = []
  uploadfileMessage: any;
  currentaddress;
  customersName: any;

  currentAddressValue: any;
  isCurrentAddressMatched: boolean | null;
  showCurrentAddress: boolean = false;

  aadharbackUploaded: any;
  pancardUploaded: any;
  bankCheque: any;
  bankStatementMessage: any;
  gstCertificateMessage: any;
  incomeTaxMessage: any;
  incorporateMessage: any;
  otpInputConfigEmail: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    behavior: 1,
  }
  otpfillemail: any;
  emailVerify = true;
  // salariedEmailVerify: boolean = false;
  selectedCustomerData: any = [];
  otpmessage: any;
  customerMessage: any;
  employemnetError: any;
  isSalaried = true
  onlyvalidateLocation: any;
  documentsform: any;
  showbtn: boolean = false;
  isSkip: boolean = true

  aadharfrontUrl: any; aadharbackUrl: any; imgdocurl: any; bankChequeurl: any; panUrl: any
  gstdocurl: any;
  Itrdocurl: any;
  certUrl: any;
  selfError: any;
  emailVerification: boolean;
  isSalary = true;
  isSelf = true;
  primaryEmail: void;
  phoneNumber: any;
  customerInfobyId: any;
  uuid: any;
  customerDataInfo: any;
  employeeDataInfo: any
  customerSavedata: any;
  customerUuid: any;
  customerView: boolean;
  searchuuid: any;
  emailStatus: any;
  customerProfile: any;
  BtnDisable: boolean = false;
  customerViewData:boolean;
  panNumber:any;

  // Dob:any;
  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private dialog: MatDialog,
    private registerService: RegisterServiceService, private router: Router, private route: ActivatedRoute,
    private sharedservice: SharedService,private activeRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.distributorid = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    this.customerInfoForm = this.formBuilder.group({
      fullname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+(?: [a-zA-Z]+)*(?:\\.[a-zA-Z]+(?: [a-zA-Z]+)*)?$")]],
      dob: ["", [Validators.required]],
      gender: [, Validators.required],
      marital: [, Validators.required],
      phnnum: ["", [Validators.required, Validators.pattern("^((\\+91-? ?)|0)?[6-9]{1}[0-9]{9}$")]],
      aadhaarnum: ["", [Validators.required, Validators.pattern("^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$")]],
      pancardnum: ["", [Validators.required, Validators.pattern("^([A-Z]){5}([0-9]){4}([A-Z]){1}$")]]
    });

    this.currentAddress = this.formBuilder.group({
      currentaddressline1: [{ value: "", disabled: true }, [Validators.required, Validators.pattern("^\\S.*$")]],
      currentaddressline2: [{ value: "", disabled: true }, [Validators.required, Validators.pattern("^\\S.*$")]],
      currentcity: [{ value: "", disabled: true }, [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      currentstate: [{ value: null, disabled: true }, , Validators.required],
      currentcountry: [{ value: "India", disabled: true }, Validators.required],
      currentpincode: [{ value: "", disabled: true }, , [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
    }, { validators: checkSameCurrentAddress });

    function checkSameCurrentAddress(formGroup: FormGroup) {
      const currentaddressline1 = formGroup.get('currentaddressline1')?.value;
      const currentaddressline2 = formGroup.get('currentaddressline2')?.value;

      if (currentaddressline1 && currentaddressline2 && currentaddressline1 === currentaddressline2) {
        formGroup.get('currentaddressline2')?.setErrors({ sameAddress: true });
      }
    };

    this.communicationAddress = this.formBuilder.group({
      addressline1: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      addressline2: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      city: ["", [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      state: [null, Validators.required],
      country: [{ value: "India", disabled: this.countryDisabled }, Validators.required],
      pincode: ["", [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
    }, { validators: checkSameCommunicationAddress });

    function checkSameCommunicationAddress(formGroup: FormGroup) {
      const addressline1 = formGroup.get('addressline1')?.value;
      const addressline2 = formGroup.get('addressline2')?.value;

      if (addressline1 && addressline2 && addressline1 === addressline2) {
        formGroup.get('addressline2')?.setErrors({ sameAddress: true });
      }
    };

    this.permanentAddress = this.formBuilder.group({
      paddressline1: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      paddressline2: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      pcity: ["", [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      pstate: [null, Validators.required],
      pcountry: [{ value: "India", disabled: this.countryDisabled }, Validators.required],
      ppincode: ["", [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
    }, { validators: checkSamePaddress });

    function checkSamePaddress(formGroup: FormGroup) {
      const paddressline1 = formGroup.get('paddressline1')?.value;
      const paddressline2 = formGroup.get('paddressline2')?.value;

      if (paddressline1 && paddressline2 && paddressline1 === paddressline2) {
        formGroup.get('paddressline2')?.setErrors({ sameAddress: true });
      }
    };
    this.salaryEmploymentForm = this.formBuilder.group({
      companyname: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      pemail: ["", [Validators.required, Validators.email, Validators.pattern("^(?!.*@(gmail|yahoo|yopmail|hotmail)\\.)[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      semail: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mincome: ["", [Validators.required, this.minIncomeValidator()]]
    }, { validators: checSalaryEmail });
    function checSalaryEmail(formGroup: FormGroup) {
      const salaryPrimaryEmail = formGroup.get('pemail')?.value;
      const salarySecondaryEmail = formGroup.get('semail')?.value;
      if (salaryPrimaryEmail && salarySecondaryEmail && salaryPrimaryEmail === salarySecondaryEmail) {
        formGroup.get('semail')?.setErrors({ isEmail: true });
      }
    };
    this.selfEmploymentForm = this.formBuilder.group({
      temployement: [null, Validators.required],
      pemail: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      semail: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      aincome: ["", [Validators.required, this.selfminIncomeValidator()]]
    }, { validators: checSelfEmail });
    function checSelfEmail(formGroup: FormGroup) {
      const selfPrimaryEmail = formGroup.get('pemail')?.value;
      const selfSecondaryEmail = formGroup.get('semail')?.value;
      if (selfPrimaryEmail && selfSecondaryEmail && selfPrimaryEmail === selfSecondaryEmail) {
        formGroup.get('semail')?.setErrors({ isSelfEmail: true });
      }
    };
    this.salaryForm = this.formBuilder.group({
      adharfrontimg: ["", Validators.required],
      adharbackimg: ["", Validators.required],
      pancardimg: ["", Validators.required],
      cancelchequeimg: ["", Validators.required],
      bankstatementimg: ["", [Validators.required]],
    });
    this.selfForm = this.formBuilder.group({
      adharfrontimg: ["", Validators.required],
      adharbackimg: ["", Validators.required],
      pancardimg: ["", Validators.required],
      gstcertificateimg: ["", Validators.required],
      incometaximg: ["", Validators.required],
      incorporationimg: ["", Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      const selectedTab = +params['tab'];
      if (selectedTab && selectedTab > 0 && selectedTab <= 4) {
        this.selectedIndex = selectedTab - 1;
      }
    });

    this.route.queryParams.subscribe(params => {
      this.customerViewData = params['customerId'];
      if(this.customerViewData){
        this.customerDetails = false;
        this.viewCustomerDetails(this.customerViewData)
      }
    })
  }
  restrictToNumbers(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    input.value = value.replace(/[^0-9]/g, '');
  }
  minIncomeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || typeof value !== 'string') {
        return null; // Return null if value is not a string
      }
      const income = parseFloat(value.replace(/,/g, ''));
      if (isNaN(income) || income < 20000) {
        return { minIncome: true };
      }
      return null;
    };
  }
  selfminIncomeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || typeof value !== 'string') {
        return null; // Return null if value is not a string
      }
      const income = parseFloat(value.replace(/,/g, ''));
      if (isNaN(income) || income < 300000) {
        return { minIncome: true };
      }
      return null;
    };
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.selectedIndex = tabChangeEvent.index;
  }
  searchByName(e: any) {
    if (this.searchFullName == '') {
      this.getallCustomerInformation = [];
      return;
    }
    this.registerService.getCustomerByName(this.searchFullName).subscribe((res) => {
      this.getallCustomerInformation = res.data;

    });
  }
  customerInfo() {
    let maritialS: any;
    if (this.customerInfoForm.controls['marital'].value == "Widowed/Divorced") {
      maritialS = "Divorced"
    } else {
      maritialS = this.customerInfoForm.controls['marital'].value
    }
    const data = {
      aadhaarNumber: this.customerInfoForm.controls['aadhaarnum'].value.replace(/[^0-9\.]/g, ''),
      dateOfBirth: this.customerInfoForm.controls['dob'].value,
      fullName: this.customerInfoForm.controls['fullname'].value,
      gender: this.customerInfoForm.controls['gender'].value,
      panNumber: this.customerInfoForm.controls['pancardnum'].value,
      phoneNumber: this.customerInfoForm.controls['phnnum'].value,
      marital: maritialS.toUpperCase(),
    }
    this.customerDataInfo = data
    console.log(this.customerDataInfo, 'gh');
    this.spinner.show();
    if (this.customerInfoForm.valid) {
      // const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
      if (this.isCustomerEdit) {
        this.updateCustomerAPI({ customerInfoDetails: data });
        localStorage.setItem('customerPhonenumber', JSON.stringify(this.customerInfoForm.controls['phnnum'].value))
        this.phoneNumber = data.phoneNumber
        this.customerDataInfo = data
        this.spinner.hide()
      } else {
        this.CustomerSaveAPI(data);
        localStorage.setItem('customerPhonenumber', JSON.stringify(this.customerInfoForm.controls['phnnum'].value))
        this.phoneNumber = data.phoneNumber
        this.customerDataInfo = data
        this.spinner.hide()
      }
    }
  }
  isSameCompany: boolean;
  primaryemail: any;
  checkEmailValidity(event: any){
    const company = this.salaryEmploymentForm.controls['companyname'].value;
    const comapnyemail = event.target.value;
    this.isSameCompany = this.checkEmailDomain(comapnyemail, company);
    // this.primaryemail = comapnyemail;
    this.salaryEmploymentForm.controls['companyname'].value.toLowerCase();
    // console.log(company);
    // console.log(event.target.value);
    // console.log(this.isSameCompany);
    // console.log(this.salaryEmploymentForm.controls['pemail'].value)
  }
  checkEmailValidityWhileCompanyNameChange(event: any){
    const companyEmail = this.salaryEmploymentForm.controls['pemail'].value;
    const companyName = event.target.value;
    this.isSameCompany = this.checkEmailDomain(companyEmail, companyName);
  }
  checkEmailDomain(email: string, domainPart: string): boolean {
    const atSplit = email.split('@'); 
    if (atSplit.length !== 2) {     // Invalid email format
      return false;
    }
    const domain = atSplit[1].split('.')[0];
    return domain.toLowerCase() === domainPart.toLowerCase();
  }

  updateCustomerAPI(data) {
    this.registerService.UpdateCustomer(this.customerId, data).subscribe((res) => {
      if (res.error === true) {
        if (res.message === "Customer already exist in your database. Do you want to create a new proposal?") {
          const dialogRef = this.dialog.open(ExistingCustomerPopupComponent, {
            data: {
              showConfirmation: true,
              message: res.message,
              customerId: res.data.uuid
            }
          });
        }
        else if (res.exceptionCode === "1005") {
          const dialogRef = this.dialog.open(ExistingCustomerPopupComponent, {
            data: {
              noConfirmation: true,
              message: res.message,
              customerId: res.data.uuid
            }
          });
          dialogRef.afterClosed().subscribe(() => {
            this.proposal = true
          })
        }
      } else {
        this.selectedIndex += 1;
        // alert(res.data.result);
      }
    });
  }


  CustomerSaveAPI(data) {
    this.registerService.CustomerSave(data).subscribe({
      next: (res) => {
        this.spinner.hide();
        // localStorage.setItem('customerId', JSON.stringify(this.customerId));
        if (res?.error == false) {
          this.customerId = 'null'
          console.log(data, 'kS');

          localStorage.setItem('customerId', JSON.stringify(this.customerId));
          this.selectedIndex += 1;
        }
        // else {
        //   this.customerMessage = res?.message
        // }
        else if (res.error === true) {
          // if (res.exceptionCode === "Customer already exist in your database. Do you want to create a new proposal?") {
          //   const dialogRef = this.dialog.open(ExistingCustomerPopupComponent, {
          //     data: {
          //       showConfirmation: true,
          //       message: res.message,
          //       customerId: res.data.customerId
          //     }
          //   });
          // }
          // else if (res.message === "The given details don't match with existing customer. Kindly connect with customer care to resolve it.") {
          //   const dialogRef = this.dialog.open(ExistingCustomerPopupComponent, {
          //     data: {
          //       noConfirmation: true,
          //       message: res.message,
          //       // customerId: res.data.customerId
          //     }
          //   });
          // }
          // else if (res.message === "This phone number already associated with another role") {
          //   const dialogRef = this.dialog.open(ExistingCustomerPopupComponent, {
          //     data: {
          //       showDistributor: true,
          //       message: res.message
          //     }
          //   });
          //   dialogRef.afterClosed().subscribe(() => {
          //     this.proposal = true
          //   })
          // }
          // else if (res.message === "customer details are incomplete,please complete the details.") {
          //   const dialogRef = this.dialog.open(ExistingCustomerPopupComponent, {
          //     data: {
          //       incompleteDetails: true,
          //       message: res.message
          //     }
          //   });
          //   dialogRef.afterClosed().subscribe(() => {
          //     const customer = {
          //       customerId: res?.data.customerId
          //     }
          //     this.viewCustomerDetails(customer)

          //   });
          // }
          // else if (res.message === "your email verification is pending,please verify your email.") {
          //   const dialogRef = this.dialog.open(ExistingCustomerPopupComponent, {
          //     data: {
          //       verificationPending: true,
          //       message: res.message
          //     }
          //   });
          //   dialogRef.afterClosed().subscribe(() => {
          //     const customer = {
          //       customerId: res?.data.customerId
          //     }
          //     this.viewCustomerDetails(customer)
          //   });
          // }
          // else {
          //   const dialogRef = this.dialog.open(ExistingCustomerPopupComponent, {
          //     data: {
          //       noConfirmation: true,
          //       message: res.message
          //     }
          //   });
          // }
          if (res.exceptionCode === '1065') {
            const dialogRef = this.dialog.open(ExistingCustomerPopupComponent, {
              data: {
                showConfirmation: true,
                message: res.message,
                customerId: res.data.uuid
              }
            });
          }
          else {
            const dialogRef = this.dialog.open(ExistingCustomerPopupComponent, {
              data: {
                noConfirmation: true,
                message: res.message,
                customerId: res.data.uuid
              }
            });

          }
        }
      },
      error: (err) => {
        this.customerMessage = err?.error.message
        //this.spinner.hide();
      }
    });
  }



  communicationAddressContinue() {
    if (this.communicationAddress.valid) {
      // console.log(this.communicationAddress.value);

      this.paddress = true
      this.communicationBtn = false
    }
  }
  onPanNum(event:any){
    const panNum = event.target.value.toUpperCase();
    this.customerInfoForm.patchValue({ pancardnum: panNum });  
  }
  permanentAddressContinue() {

    if (this.permanentAddress.valid) {

      // if (this.currentAddressValue) {
      const data = {
        customerAddressDetails: [
          {
            addressLine1: this.communicationAddress.controls['addressline1'].value,
            addressLine2: this.communicationAddress.controls['addressline2'].value,
            addressType: "communication",
            city: this.communicationAddress.controls['city'].value,
            country: this.communicationAddress.controls['country'].value,
            pinCode: this.communicationAddress.controls['pincode'].value,
            state: this.communicationAddress.controls['state'].value
          },
          {
            addressLine1: this.permanentAddress.controls['paddressline1'].value,
            addressLine2: this.permanentAddress.controls['paddressline2'].value,
            addressType: "permanent",
            city: this.permanentAddress.controls['pcity'].value,
            country: this.permanentAddress.controls['pcountry'].value,
            pinCode: this.permanentAddress.controls['ppincode'].value,
            state: this.permanentAddress.controls['pstate'].value
          }
          // {
          //   addressLine1: this.currentAddressValue.addressLine1,
          //   addressLine2: this.currentAddressValue.addressLine2,
          //   addressType: "current",
          //   city: this.currentAddressValue.city,
          //   country: this.currentAddressValue.country,
          //   pinCode: this.currentAddressValue.pinCode,
          //   state: this.currentAddressValue.state,
          //   formatted_address: this.currentAddressValue.formatted_address,
          //   location: this.currentAddressValue.location,
          //   currentAddressMatched: this.isCurrentAddressMatched
          // },
        ]
        // currentAddressMatched: this.isCurrentAddressMatched
      }

      // } else {
      //   console.log(this.permanentAddress.value);
      //   this.selectedIndex += 1;
      //   // this.yourLocation()
      // }
      if (this.isCustomerEdit && this.customerId) {
        this.updateAddressAPI({ customerAddressDetails: data.customerAddressDetails });
      } else {
        this.saveAddressAPI(data);
      }
    }
  }

  updateAddressAPI(data) {
    this.registerService.UpdateCustomer(this.customerId, data).subscribe((res) => {
      if (!res.error) {
        this.selectedIndex += 1;
      } else {
        alert(res.data.result);
      }
    });
  }
  saveAddressAPI(data) {
    this.registerService.saveCustomerDetails(data, this.customerId, this.distributorid).subscribe((res) => {
      if (!res.error) {
        this.selectedIndex += 1;
      } else {
        alert(res.data.result);
      }
    });
  }

  checkValue(e: any) {
    if (e.target.checked) {
      const address1Val = this.communicationAddress.controls["addressline1"].value;
      const address2Val = this.communicationAddress.controls["addressline2"].value;
      const cityVal = this.communicationAddress.controls["city"].value;
      const stateVal = this.communicationAddress.controls["state"].value;
      // const countryVal = this.currentAddress.controls["country"].value;
      const pincodeVal = this.communicationAddress.controls["pincode"].value;

      this.permanentAddress.controls["paddressline1"].setValue(address1Val);
      this.permanentAddress.controls["paddressline2"].setValue(address2Val);
      this.permanentAddress.controls["pcity"].setValue(cityVal);
      this.permanentAddress.controls["pstate"].setValue(stateVal);
      // this.currentAddress.controls["pcountry"].setValue(countryVal);
      this.permanentAddress.controls["ppincode"].setValue(pincodeVal);
    }
    else {
      this.permanentAddress.controls["paddressline1"].setValue('');
      this.permanentAddress.controls["paddressline2"].setValue('');
      this.permanentAddress.controls["pcity"].setValue('');
      this.permanentAddress.controls["pstate"].setValue('');
      // this.currentAddress.controls["pcountry"].setValue('');
      this.permanentAddress.controls["ppincode"].setValue('');
    }
  }

  setUpCustomer() {
    this.proposal = !this.proposal;
    this.isCustomerEdit = false;
  }

  checkSalary() {
    this.salary = true
  }

  checkSelf() {
    this.salary = false
  }

  Salariedemployment() {
    const data = {
      // employementDetails: {
      employmentType: "SALARIEDEMPLOYEE",
      salariedEmployeeDetails: {
        companyName: this.salaryEmploymentForm.controls['companyname'].value,
        monthlyIncome: ("" + this.salaryEmploymentForm.controls['mincome'].value).replace(/[^0-9\.]/g, ''),
        primaryEmail: this.salaryEmploymentForm.controls['pemail'].value,
        secondaryEmail: this.salaryEmploymentForm.controls['semail'].value,
      }
      // },
    }
    if (this.isCustomerEdit && this.customerId) {
      this.updateEmployeeDetails({ data });
      // localStorage.setItem('primaryEmail', JSON.stringify(data.employementDetails.salariedEmployeeDetails.primaryEmail))
      this.primaryEmail = data.salariedEmployeeDetails.primaryEmail
      this.employeeDataInfo = data
    } else {
      this.saveEmployeeDetails(data);
      sessionStorage.setItem('primaryEmail', JSON.stringify(data.salariedEmployeeDetails.primaryEmail))
      this.primaryEmail = data.salariedEmployeeDetails.primaryEmail
      this.employeeDataInfo = data
    }
  }

  updateEmployeeDetails(data) {
    this.registerService.UpdateCustomer(this.customerId, data).subscribe((res) => {
      if (!res.error && this.emailVerification) {
        this.selectedIndex += 1;
      } else {
        this.customerDetails = false
        this.customerView = false
      }
    });
  }
  saveEmployeeDetails(data) {
    this.registerService.saveEmployment(data).subscribe({
      next: (res) => {
        if (res?.error == true) {
          this.employemnetError = res.message
        }
        else {
          this.customerDetails = false
          this.customerView = false
          if (this.employeeDataInfo?.employmentType == 'SALARIEDEMPLOYEE') {
            this.selfEmploymentForm.controls['aincome'].setValue('');
            this.selfEmploymentForm.controls['pemail'].setValue(''),
              this.selfEmploymentForm.controls['semail'].setValue(''),
              this.selfEmploymentForm.controls['temployement'].setValue('')
            this.isSalaried = true
          }
          else {
            this.salaryEmploymentForm.controls['companyname'].setValue(''),
              this.salaryEmploymentForm.controls['mincome'].setValue(''),
              this.salaryEmploymentForm.controls['pemail'].setValue(''),
              this.salaryEmploymentForm.controls['semail'].setValue('')
            this.isSalaried = false
          }
        }
      },
      error: (err) => {
        this.employemnetError = "No Active Internet Found, Please connect to active internet Connection."
      }
    });

  }

  // sendEmailSalaried() {
  //   const data = {
  //     email: this.salaryEmploymentForm.controls['pemail'].value,
  //     phoneNumber: this.customerInfoForm.controls['phnnum'].value
  //   }
  //   // const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
  //   this.registerService.sendEmail(data, this.customerId).subscribe((res) => {
  //   });
  //   this.sharedservice.setSalariedPrimaryEmail(data.email)
  //   // localStorage.setItem('primaryEmail', JSON.stringify(this.salaryEmploymentForm.controls['pemail'].value))
  //   localStorage.setItem('customerPhonenumber', JSON.stringify(this.customerInfoForm.controls['phnnum'].value))
  //   localStorage.setItem('customerId', JSON.stringify(this.customerId))
  // }


  selfEmploymentt() {
    const data = {
      // employementDetails: {
      employmentType: "SELFEMPLOYEE",
      selfEmployeeDetails: {
        annualIncome: ('' + this.selfEmploymentForm.controls['aincome'].value).replace(/[^0-9\.]/g, ''),
        primaryEmail: this.selfEmploymentForm.controls['pemail'].value,
        secondaryEmail: this.selfEmploymentForm.controls['semail'].value,
        typeOfEmployement: this.selfEmploymentForm.controls['temployement'].value
      }
      // },
      // employmentType: "SALARIEDEMPLOYEE",
      // salariedEmployeeDetails: {
      //     companyName: this.salaryEmploymentForm.controls['companyname'] == null,
      //     monthlyIncome: ("" + this.salaryEmploymentForm.controls['mincome'].value).replace(/[^0-9\.]/g, '') == null,
      //     primaryEmail: this.salaryEmploymentForm.controls['pemail'].value== null,
      //     secondaryEmail: this.salaryEmploymentForm.controls['semail'].value== null,
      //   }

    }
    if (this.isCustomerEdit && this.customerId) {
      this.updateEmployeeDetails({ data });
      this.primaryEmail = data.selfEmployeeDetails.primaryEmail
      this.employeeDataInfo = data
      // localStorage.setItem('primaryEmail', JSON.stringify(data.employementDetails.selfEmployeeDetails.primaryEmail))
    } else {
      this.saveEmployeeDetails(data);
      this.primaryEmail = data.selfEmployeeDetails.primaryEmail
      this.employeeDataInfo = data
      sessionStorage.setItem('primaryEmail', JSON.stringify(data.selfEmployeeDetails.primaryEmail))
    }
  }

  // updateSelfAPI(data) {
  //   this.registerService.UpdateCustomer(this.customerId, data).subscribe((res) => {
  //     if (!res.error && this.emailVerification) {
  //       this.selectedIndex += 1;
  //       // this.sendEmailSelf()
  //     } else {
  //       // alert(res.data.result);
  //       this.selectedIndex += 1;
  //       // this.sendEmailSelf()
  //     }
  //   });


  // }

  // saveSelfAPI(data) {
  //   this.registerService.saveEmployment(data).subscribe((res: any) => {
  //     if (res?.error == true) {
  //       this.employemnetError = res.message
  //     }
  //     else {
  //       this.customerDetails = false
  //     }
  //   });
  // }
  createProposalContinue() {
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    this.uuid = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    if (this.employeeDataInfo?.employmentType == 'SALARIEDEMPLOYEE') {
      this.customerSavedata = {
        fullName: this.customerDataInfo.fullName,
        dateOfBirth: this.customerDataInfo.dateOfBirth,
        gender: this.customerDataInfo.gender,
        phoneNumber: this.customerDataInfo.phoneNumber,
        aadhaarNumber: this.customerDataInfo.aadhaarNumber,
        panNumber: this.customerDataInfo.panNumber,
        maritalStatus: this.customerDataInfo.marital,
        employmentDto: {
          employmentType: this.employeeDataInfo?.employmentType,
          "salariedEmployeeDetails": {
            "companyName": this.employeeDataInfo?.salariedEmployeeDetails.companyName,
            "primaryEmail": this.employeeDataInfo?.salariedEmployeeDetails.primaryEmail,
            "secondaryEmail": this.employeeDataInfo?.salariedEmployeeDetails.secondaryEmail,
            "monthlyIncome": this.employeeDataInfo?.salariedEmployeeDetails.monthlyIncome
          },
          "selfEmployeeDetails": null
        },
        "currentAddressMatched": true
      }
    }
    else {
      this.customerSavedata = {
        fullName: this.customerDataInfo.fullName,
        dateOfBirth: this.customerDataInfo.dateOfBirth,
        gender: this.customerDataInfo.gender,
        phoneNumber: this.customerDataInfo.phoneNumber,
        aadhaarNumber: this.customerDataInfo.aadhaarNumber,
        panNumber: this.customerDataInfo.panNumber,
        maritalStatus: this.customerDataInfo.marital,
        employmentDto: {
          employmentType: this.employeeDataInfo?.employmentType,
          selfEmployeeDetails: {
            annualIncome: this.employeeDataInfo?.selfEmployeeDetails?.annualIncome,
            primaryEmail: this.employeeDataInfo?.selfEmployeeDetails?.primaryEmail,
            secondaryEmail: this.employeeDataInfo?.selfEmployeeDetails?.secondaryEmail,
            typeOfEmployement: this.employeeDataInfo?.selfEmployeeDetails?.typeOfEmployement
          },
          salariedEmployeeDetails: null,
        },
        "currentAddressMatched": true
      }
    }
    this.registerService.SaveCustomerInfo(this.uuid, this.customerSavedata).subscribe((res: any) => {
      if (res?.error == false) {
        this.customerUuid = res?.data.uuid
        sessionStorage.setItem('customerUuid', JSON.stringify(res?.data.uuid))
        this.registerService.sendCustomerEmail(this.customerUuid).subscribe((res) => {
        });
        this.router.navigate(['./customer-details']);
      }
    });

  }
  sendCustomerEmail() {
    this.registerService.sendCustomerEmail(this.customerUuid).subscribe((res:any) => {
      if(res.error == false){
        this.dialog.open(SuccessPopupComponent,{
          width: '329px',
         height: '154px'
        })
      }
    });
    
  }
  // getCustomerById(customerId){
  //   this.spinner.show();
  //     this.registerService.getCustomerInfoById(customerId).subscribe((res)=>{
  //      this.selectedCustomerData  = res;
  //      this.spinner.hide();
  //   });

  // }
  // sendEmailSelf() {
  //   const data = {
  //     email: this.selfEmploymentForm.controls['pemail'].value,
  //     phoneNumber: this.customerInfoForm.controls['phnnum'].value
  //   }
  //   // const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? '');
  //   this.registerService.sendEmail(data, this.customerId,).subscribe((res) => {
  //   });
  //   this.sharedservice.setSelfPrimaryEmail(data.email)
  //   // console.log(data.email, 'val');
  //   // localStorage.setItem('primaryEmail', JSON.stringify(this.selfEmploymentForm.controls['pemail'].value))
  // }
  updatedIds: any = []
  AdharFrontFile(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }

    if (file.size <= 5 * 1024 * 1024) {
      this.updatefilefrnt = file;
      this.imgname = file.name;
      const formData = new FormData();
      formData.append('file', this.updatefilefrnt);
      this.customerId = JSON.parse(localStorage.getItem('customerId') ?? '')
      this.registerService.customerUploadDocument(this.customerId, 'AADHAR_FRONT_IMG', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.uploadfileMessage = res.message;
        this.updatedIds.push({ documentId: res.documentId, documentType: 'AADHAR_FRONT_IMG' })
      });
    } else {
      alert('File size should not be greater than 5MB.');
    }
    event.target.value = null;
  }

  //adhar back file//

  AdharBackFile(event: any) {
    const updatefileback = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(updatefileback.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatefileback = event.target.files[0];
    if (this.updatefileback.size <= 5 * 1024 * 1024) {
      // this.imagePreview = true;
      this.imgback = event.target.files[0].name;
      const formData = new FormData();
      formData.append('file', this.updatefileback)
      this.registerService.customerUploadDocument(this.customerId, 'AADHAR_BACK_IMG', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.updatedIds.push({ documentId: res.documentId, documentType: 'AADHAR_BACK_IMG' })
        this.aadharbackUploaded = res.message;
        // console.log(this.aadharbackUploaded, 'DocumentUPload');
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  //pan upload//
  PanFrontFile(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.Panupdatefile = event.target.files[0];
    if (this.Panupdatefile.size <= 5 * 1024 * 1024) {
      // this.imagePreview = true;
      this.imgbpan = event.target.files[0].name;
      const formData = new FormData();
      formData.append('file', this.Panupdatefile)
      this.registerService.customerUploadDocument(this.customerId, 'PAN_CARD', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.updatedIds.push({ documentId: res.documentId, documentType: 'PAN_CARD' })
        this.pancardUploaded = res.message;
      });

    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  BankdetailsCheque(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatedbankFile1 = event.target.files[0];
    if (this.updatedbankFile1.size <= 5 * 1024 * 1024) {
      // this.imagePreview = true;
      this.imgbank1 = event.target.files[0].name;
      const formData = new FormData();
      formData.append('file', this.updatedbankFile1)
      this.registerService.customerUploadDocument(this.customerId, 'BANK_CHEQUE', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.updatedIds.push({ documentId: res.documentId, documentType: 'BANK_CHEQUE' })
        this.bankCheque = res.message;
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  BankdetailStatement(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatedbankFile2 = event.target.files[0];
    if (this.updatedbankFile2.size <= 5 * 1024 * 1024) {
      // this.imagePreview = true;
      this.imgbank2 = event.target.files[0].name;
      const formData = new FormData();
      formData.append('file', this.updatedbankFile2)
      this.registerService.customerUploadDocument(this.customerId, 'BANK_STATEMENT', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.updatedIds.push({ documentId: res.documentId, documentType: 'BANK_STATEMENT' })
        this.bankStatementMessage = res.message;
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }


  uploadGstCertificate(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents1 = event.target.files[0];
    if (this.documents1.size <= 5 * 1024 * 1024) {
      // this.imagePreview = true;
      this.imgdocument1 = event.target.files[0].name;
      const formData = new FormData();
      formData.append('file', this.documents1)
      this.registerService.customerUploadDocument(this.customerId, 'GST', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.updatedIds.push({ documentId: res.documentId, documentType: 'GST' })
        this.gstCertificateMessage = res.message;
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }


  uploadIncomeTax(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents2 = event.target.files[0];
    if (this.documents2.size <= 5 * 1024 * 1024) {
      // this.imagePreview = true;
      this.imgdocument2 = event.target.files[0].name;
      const formData = new FormData();
      formData.append('file', this.documents2)
      this.registerService.customerUploadDocument(this.customerId, 'ITR', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.updatedIds.push({ documentId: res.documentId, documentType: 'ITR' })
        this.incomeTaxMessage = res.message;
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }


  uploadIncorporate(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents3 = event.target.files[0];
    if (this.documents3.size <= 5 * 1024 * 1024) {
      // this.imagePreview = true;
      this.imgdocument3 = event.target.files[0].name;
      const formData = new FormData();
      formData.append('file', this.documents3)
      this.registerService.customerUploadDocument(this.customerId, 'INCORPORATION_CERT', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.updatedIds.push({ documentId: res.documentId, documentType: 'INCORPORATION_CERT' })
        this.incorporateMessage = res.message;
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }


  salaryContinue() {
    const data = {
      customerKycDetails: {
        documentIds:
          this.documentIds
      }
    }
    this.registerService.saveCustomerDetails(data, this.customerId, this.distributorid).subscribe((res) => {
      if (res?.error == false) {
        this.router.navigate(['./customer-details'])
      }
      else {
        alert('Customer Not Found')
      }
    });
  }
  salaryData() {
    let existingarr = [];
    if (this.selectedCustomerData && this.selectedCustomerData.documentList) {
      existingarr = this.selectedCustomerData.documentList.map((x: any) => ({
        documentId: x.documentId,
        documentType: x.documentType
      }));
    }
    // console.log(existingarr);
    let newArray: any = [...this.updatedIds, ...existingarr];

    // console.log(newArray,'newarr');
    const latestDocuments = {};
    newArray.forEach(document => {
      const { documentId, documentType } = document;
      if (latestDocuments.hasOwnProperty(documentType)) {
        if (documentId > latestDocuments[documentType].documentId) {
          latestDocuments[documentType] = document;
        }
      } else {
        latestDocuments[documentType] = document;
      }
    });
    const latestDocumentsArray = Object.values(latestDocuments);
    let ids = latestDocumentsArray.map((x: any) => x.documentId)
    if (latestDocumentsArray.length === 5) {
      const data = {
        customerKycDetails: {
          documentIds: ids
        }
      }
      this.registerService.saveCustomerDetails(data, this.customerId, this.distributorid).subscribe((res) => {
        this.router.navigate(['./customer-details'])
      });
    } else {
      alert('Please fill all the Documents OR Skip for Now')
    }
  }

  selfContinue() {
    const data = {
      customerKycDetails: {
        documentIds:
          this.documentIds
      }
    }
    this.registerService.saveCustomerDetails(data, this.customerId, this.distributorid).subscribe((res) => {
      this.router.navigate(['./customer-details'])
    });
  }

  selfData() {
    let existingarr: any = [];
    if (this.selectedCustomerData && this.selectedCustomerData.documentList) {
      existingarr = this.selectedCustomerData.documentList?.filter((item) => item.documentType !== "BANK_CHEQUE" && item.documentType !== "BANK_STATEMENT").
        map((x: any) => ({
          documentId: x.documentId,
          documentType: x.documentType
        }));
    }
    let newArray: any = [...this.updatedIds, ...existingarr];

    const latestDocuments = {};
    newArray.forEach(document => {
      const { documentId, documentType } = document;

      if (latestDocuments.hasOwnProperty(documentType)) {
        if (documentId > latestDocuments[documentType].documentId) {
          latestDocuments[documentType] = document;
        }
      } else {
        latestDocuments[documentType] = document;
      }
    });
    const latestDocumentsArray = Object.values(latestDocuments);
    let ids = latestDocumentsArray.map((x: any) => x.documentId)

    if (latestDocumentsArray.length === 6) {
      const data = {
        customerKycDetails: {
          documentIds: ids
        }
      }
      // console.log(data);
      this.registerService.saveCustomerDetails(data, this.customerId, this.distributorid).subscribe((res) => {
        this.router.navigate(['./customer-details'])
      });
    } else {
      alert('Please fill all the Documents Or Skip For Now')
    }

  }
  skipForNow() {

    const dialogRef = this.dialog.open(PleaseConfirmPopupComponent, {
      width: '329px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.isCustomerEdit == false) {
        this.registerService.skipNotification(this.customerId, this.distributorid).subscribe((res) => {
        })
      }
    });
    // this.router.navigate(['./customer-details'],
    //   { queryParams: { tab: this.selectedIndex } });
    // localStorage.setItem('selectedIndex', JSON.stringify(this.selectedIndex += 1));

  }

  viewCustomerDetails(customer: any) {
    if(this.customerViewData){
      this.customerUuid = this.customerViewData
      this.customerView = true;
    }
    else{
      this.customerUuid = customer.uuid;
      this.customerView = true;
      this.customerDetails = !this.customerDetails;
    }
    // this.customerDetails = !this.customerDetails;
    // this.spinner.show();
    // this.customerView = true;
    this.selectedCustomerData = {};
    sessionStorage.setItem('customerUuid', JSON.stringify(this.customerUuid))
    this.registerService.getCustomerData(this.customerUuid).subscribe((res: any) => {
      this.selectedCustomerData = res?.data;
      this.emailStatus = res?.data?.customerOnBoardingStatus;
      if (this.selectedCustomerData.userDocuments !== null) {
        this.imgdocurl = (this.selectedCustomerData?.userDocuments && this.selectedCustomerData?.userDocuments?.find((doc: any) => doc?.documentType === 'BANK_STATEMENT')?.s3Url) || null
        this.imgbank1 = (this.selectedCustomerData.userDocuments && this.selectedCustomerData.userDocuments.find((doc: any) => doc?.documentType === 'BANK_STATEMENT')?.s3FileName.replace(/^\d+_/, '')) || null
        this.imgdocument1 = (this.selectedCustomerData.userDocuments && this.selectedCustomerData.userDocuments.find((doc: any) => doc.documentType === 'GST')?.s3FileName.replace(/^\d+_/, '')) || null
        this.imgdocument2 = (this.selectedCustomerData.userDocuments && this.selectedCustomerData.userDocuments.find((doc: any) => doc.documentType === 'INCORPORATION_CERT')?.s3FileName.replace(/^\d+_/, '')) || null
        this.imgdocument3 = (this.selectedCustomerData.userDocuments && this.selectedCustomerData.userDocuments.find((doc: any) => doc.documentType === 'ITR')?.s3FileName.replace(/^\d+_/, '')) || null
        this.gstdocurl = (this.selectedCustomerData.userDocuments && this.selectedCustomerData.userDocuments.find((doc: any) => doc.documentType === 'GST')?.s3Url) || null
        this.certUrl = (this.selectedCustomerData.userDocuments && this.selectedCustomerData.userDocuments.find((doc: any) => doc.documentType === 'INCORPORATION_CERT')?.s3Url) || null
        this.Itrdocurl = (this.selectedCustomerData.userDocuments && this.selectedCustomerData.userDocuments.find((doc: any) => doc.documentType === 'ITR')?.s3Url) || null
        this.customerProfile = (this.selectedCustomerData.userDocuments && this.selectedCustomerData.userDocuments.find((doc: any) => doc.documentType === 'PHOTO')?.s3Url) || null
      }
      // next: (res) => {
      //   localStorage.setItem('documentcheck', JSON.stringify(res.documentList));
      //   this.selectedCustomerData = res.data;
      //   this.imgname = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'AADHAR_FRONT_IMG')?.s3FileName.replace(/^\d+_/, '')) || null
      //   this.imgback = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'AADHAR_BACK_IMG')?.s3FileName.replace(/^\d+_/, '')) || null
      //   this.imgbpan = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'PAN_CARD')?.s3FileName.replace(/^\d+_/, '')) || null
      //   if (this.selectedCustomerData && this.selectedCustomerData.employementDetails && this.selectedCustomerData.employementDetails.employmentType === 'SALARIEDEMPLOYEE') {
      //     this.imgbank1 = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'BANK_CHEQUE')?.s3FileName.replace(/^\d+_/, '')) || null
      //     this.imgbank2 = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'BANK_STATEMENT')?.s3FileName.replace(/^\d+_/, '')) || null
      //   }
      //   if (this.selectedCustomerData && this.selectedCustomerData.employementDetails && this.selectedCustomerData.employementDetails.employmentType === 'SELFEMPLOYEE') {
      //     this.imgdocument1 = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'GST')?.s3FileName.replace(/^\d+_/, '')) || null
      //     this.imgdocument2 = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'INCORPORATION_CERT')?.s3FileName.replace(/^\d+_/, '')) || null
      //     this.imgdocument3 = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'ITR')?.s3FileName.replace(/^\d+_/, '')) || null
      //   }
      //   this.spinner.hide();
      //   this.aadharfrontUrl = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'AADHAR_FRONT_IMG')?.s3Url) || null
      //   this.aadharbackUrl = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'AADHAR_BACK_IMG')?.s3Url) || null
      //   this.panUrl = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'PAN_CARD')?.s3Url) || null
      //   if (this.selectedCustomerData && this.selectedCustomerData.employementDetails && this.selectedCustomerData.employementDetails.employmentType === 'SALARIEDEMPLOYEE') {
      //     this.bankChequeurl = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'BANK_CHEQUE')?.s3Url) || null
      //     this.imgdocurl = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'BANK_STATEMENT')?.s3Url) || null
      //   }
      //   if (this.selectedCustomerData && this.selectedCustomerData.employementDetails && this.selectedCustomerData.employementDetails.employmentType === 'SELFEMPLOYEE') {
      //     this.gstdocurl = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'GST')?.s3Url) || null
      //     this.certUrl = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'INCORPORATION_CERT')?.s3Url) || null
      //     this.Itrdocurl = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'ITR')?.s3Url) || null
      //   }
      //   this.emailVerification = res?.emailVerified
      //   if (res.employementDetails === null) {
      //     this.isSalary = true
      //     this.isSelf = true

      //   }
      // },
      // error: (err) => {
      //   this.spinner.hide();
      // }
    })
  }

  kycdocuments(documentType: string, imageUrl: string) {
    if (imageUrl && imageUrl.toLowerCase().includes('.pdf')) {
      window.open(imageUrl, '_blank');
    } else {
      this.dialog.open(KycdocumentsPopupComponent, {
        height: '376px',
        width: '329px',
        data: { documentType, imageUrl }
      });
    }
  }
  yourLocation() {
    let dialogRef = this.dialog.open(LocationPopupComponent, {
      width: '270px',

    })

    dialogRef.afterClosed().subscribe((res) => {
      let userEnteredAddress = this.communicationAddress.value;
      if (res) {
        let firstAddress = res.results[0];
        let tempAddress = []
        let addressObj: any = {
          address: []
        };
        firstAddress.address_components.forEach(x => {
          if (x.types.indexOf('country') !== -1) {
            addressObj['country'] = x.long_name;
          }
          if (x.types.indexOf('postal_code') !== -1) {
            addressObj['pincode'] = x.long_name;
          }
          if (x.types.indexOf('administrative_area_level_1') !== -1) {
            addressObj['state'] = x.long_name;
          }
          if (x.types.indexOf('administrative_area_level_3') !== -1) {
            addressObj['town'] = x.long_name;
          }
          if (x.types.indexOf('locality') !== -1) {
            addressObj['city'] = x.long_name;
          }
          if (x.types.indexOf('sublocality') !== -1) {
            addressObj['address'].push(x.long_name);
          }
        })
        addressObj['formatted_Address'] = firstAddress.formatted_address;
        addressObj['location'] = firstAddress.geometry.location;

        // console.log(addressObj);
        let isUserAdressMatched = false;

        // if(addressObj.address.indexOf(userEnteredAddress.addressline1) !== -1) 
        //   isUserAdressMatched = true;
        addressObj.address.forEach((address: string) => {
          if (address.toLowerCase() === userEnteredAddress.addressline1.toLowerCase() ||
            address.toLowerCase() === userEnteredAddress.addressline2.toLowerCase()) {
            isUserAdressMatched = true;
          }
        })

        // if(addressObj.address.indexOf(userEnteredAddress.addressline2) !== -1) 
        // isUserAdressMatched = true;



        if (isUserAdressMatched) {

          // Need to call api or need to add one flag for stating that user address is matched with geo address
          // alert("Address matched");
          const dialogRef = this.dialog.open(LocationSuccessComponent);
          dialogRef.afterClosed().subscribe(() => {
            //  this.selectedIndex = 1;
          });
          this.appendCurrentAddresss(addressObj, true);
          this.permanentAddressContinue();

        } else {
          let dialogRef2 = this.dialog.open(AddressPopupComponent);
          dialogRef2.afterClosed().subscribe((res) => {
            if (res) {
              if (res == 'detectGeoAddress') {
                this.yourLocation();
              } else if (res == 'continueGeoAddress') {
                // Show geo address in the new tab as per figma with the addressObj data with disable fields
                // console.log(addressObj);
                this.showCurrentAddress = true;
                this.appendCurrentAddresss(addressObj, false);
              }
            }
          });
        }
      }
    });
    // localStorage.setItem('selectedIndex', JSON.stringify(this.selectedIndex += 1));

  }
  appendCurrentAddresss(value, isAddressMatched) {
    this.currentAddressValue = {
      addressLine1: value.address[0],
      addressLine2: value.address.slice(1).join(','),
      city: value.city,
      state: value.state,
      country: value.country,
      pinCode: value.pincode,
      formatted_address: value.formatted_address,
      location: value.location.lat + ',' + value.location.lng,
    }
    this.isCurrentAddressMatched = isAddressMatched;
    if (!isAddressMatched) {
      this.currentAddress.patchValue({
        currentaddressline1: this.currentAddressValue.addressLine1,
        currentaddressline2: this.currentAddressValue.addressLine2,
        currentcity: this.currentAddressValue.city,
        currentstate: this.currentAddressValue.state,
        currentcountry: this.currentAddressValue.country,
        currentpincode: this.currentAddressValue.pinCode,
      })
    }
  }
  onAadhaarFront() {
    this.aadharFront = true
  }
  onAadhaarBack() {
    this.aadharBack = true
  }
  onPanCard() {
    this.panCard = true
  }
  onCancelCheque() {
    this.cancelCheque = true
  }
  onBankStatement() {
    this.bankStatement = true
  }
  onGst() {
    this.gstCertificate = true
  }
  onIncome() {
    this.incomeTax = true
  }
  onIncorporation() {
    this.incorporation = true
  }
  removeAadharFront(event: Event) {
    this.imgname = ""
    event.preventDefault()

  }
  removeAadharBack(event: Event) {
    this.imgback = ""
    event.preventDefault()
  }
  removePan(event: Event) {
    this.imgbpan = ""
    event.preventDefault()
  }
  removeCancelCheque(event: Event) {
    this.imgbank1 = ""
    event.preventDefault()
  }
  removeBankStatement(event: Event) {
    this.imgbank2 = ""
    event.preventDefault()
  }
  removeGst(event: Event) {
    this.imgdocument1 = ""
    event.preventDefault()
  }
  removeIncome(event: Event) {
    this.imgdocument2 = ""
    event.preventDefault()
  }
  removeIncorporation(event: Event) {
    this.imgdocument3 = ""
    event.preventDefault()
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(DatePickerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        // console.log("Dialog output:", data);
        this.customerInfoForm.patchValue({
          dob: data
        })
      }
    );
  }


  // navigateEditPage() {
  //   this.showbtn = true
  //   this.sharedservice.setupdatecustomer(this.showbtn)
  //   this.customerDetails = true;
  //   this.proposal = false;
  //   this.paddress = true;
  //   this.communicationBtn = false;
  //   this.customerId = this.selectedCustomerData.customerId;
  //   localStorage.setItem("customerId", JSON.stringify(this.customerId))
  //   localStorage.setItem('customerPhonenumber', JSON.stringify(this.selectedCustomerData.phoneNumber));
  //   this.isCustomerEdit = true;

  //   this.customerInfoForm.controls['phnnum']?.disable();

  //   this.imgname = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'AADHAR_FRONT_IMG').s3FileName) || null
  //   this.imgback = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'AADHAR_BACK_IMG').s3FileName) || null
  //   this.imgbpan = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'PAN_CARD').s3FileName) || null

  //   this.customerInfoForm.patchValue({
  //     fullname: this.selectedCustomerData.fullName,
  //     dob: this.selectedCustomerData.dateOfBirth,
  //     gender: this.selectedCustomerData.gender,
  //     phnnum: this.selectedCustomerData.phoneNumber,
  //     aadhaarnum: this.selectedCustomerData.aadharNumber.replace(/(\d{4})(?=\d)/g, "$1 "),
  //     pancardnum: this.selectedCustomerData.panNumber
  //   });

  //   // this.isCurrentAddressMatched = this.selectedCustomerData.currentAddressMatched ?? false;
  //   let communicationAddress
  //   if (this.selectedCustomerData && this.selectedCustomerData.customerAddressDetails) {
  //     communicationAddress = this.selectedCustomerData.customerAddressDetails.find(x => x.addressType.toLowerCase() === "communication");
  //   }

  //   if (communicationAddress) {
  //     this.communicationAddress.patchValue({
  //       addressline1: communicationAddress.addressLine1,
  //       addressline2: communicationAddress.addressLine2,
  //       city: communicationAddress.city,
  //       state: communicationAddress.state,
  //       country: communicationAddress.country,
  //       pincode: communicationAddress.pinCode,
  //     });
  //   }

  //   let permanentAddress
  //   if (this.selectedCustomerData && this.selectedCustomerData.customerAddressDetails) {
  //     permanentAddress = this.selectedCustomerData.customerAddressDetails.find(x => x.addressType.toLowerCase() === "permanent");
  //   }

  //   if (permanentAddress) {
  //     this.permanentAddress.patchValue({
  //       paddressline1: permanentAddress.addressLine1,
  //       paddressline2: permanentAddress.addressLine2,
  //       pcity: permanentAddress.city,
  //       pstate: permanentAddress.state,
  //       pcountry: permanentAddress.country,
  //       ppincode: permanentAddress.pinCode,
  //     });
  //   }

  //   // let currentAddress = this.selectedCustomerData.customerAddressDetails.find(x => x.addressType == "current");
  //   // if (currentAddress && !this.isCurrentAddressMatched) {
  //   //   this.currentAddress.patchValue({
  //   //     currentaddressline1: currentAddress.addressLine1,
  //   //     currentaddressline2: currentAddress.addressLine2,
  //   //     currentcity: currentAddress.city,
  //   //     currentstate: currentAddress.state,
  //   //     currentcountry: currentAddress.country,
  //   //     currentpincode: currentAddress.pinCode,
  //   //   });
  //   //   this.currentAddressValue = currentAddress;
  //   //   this.showCurrentAddress = true;
  //   // }

  //   if ((this.selectedCustomerData && this.selectedCustomerData.employementDetails && this.selectedCustomerData.employementDetails.employmentType === 'SALARIEDEMPLOYEE') || null) {
  //     this.imgbank1 = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'BANK_CHEQUE')?.s3FileName) || null
  //     this.imgbank2 = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'BANK_STATEMENT')?.s3FileName) || null
  //     this.sharedservice.setSalariedPrimaryEmail((this.selectedCustomerData && this.selectedCustomerData.employementDetails && this.selectedCustomerData.employementDetails.salariedEmployeeDetails && this.selectedCustomerData.employementDetails.salariedEmployeeDetails.primaryEmail) ?? 'null')
  //     this.salaryEmploymentForm.patchValue({
  //       companyname: this.selectedCustomerData.employementDetails?.salariedEmployeeDetails?.companyName,
  //       pemail: this.selectedCustomerData.employementDetails?.salariedEmployeeDetails?.primaryEmail,
  //       semail: this.selectedCustomerData.employementDetails?.salariedEmployeeDetails?.secondaryEmail,
  //       mincome: this.selectedCustomerData.employementDetails?.salariedEmployeeDetails?.monthlyIncome
  //         .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  //     });
  //     this.salary = true
  //     this.isSalaried = true
  //     this.isSelf = false;
  //   }

  //   if ((this.selectedCustomerData && this.selectedCustomerData.employementDetails && this.selectedCustomerData.employementDetails.employmentType === 'SELFEMPLOYEE') || null) {
  //     this.imgdocument1 = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'GST')?.s3FileName) || null
  //     this.imgdocument2 = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'INCORPORATION_CERT')?.s3FileName) || null
  //     this.imgdocument3 = (this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find((doc: any) => doc.documentType === 'ITR')?.s3FileName) || null
  //     this.sharedservice.setSelfPrimaryEmail((this.selectedCustomerData && this.selectedCustomerData.employementDetails && this.selectedCustomerData.employementDetails.selfEmployeeDetails && this.selectedCustomerData.employementDetails.selfEmployeeDetails.primaryEmail) ?? 'null')
  //     this.selfEmploymentForm.patchValue({
  //       temployement: this.selectedCustomerData.employementDetails?.selfEmployeeDetails?.typeOfEmployement,
  //       pemail: this.selectedCustomerData.employementDetails?.selfEmployeeDetails?.primaryEmail,
  //       semail: this.selectedCustomerData.employementDetails?.selfEmployeeDetails?.secondaryEmail,
  //       aincome: this.selectedCustomerData.employementDetails?.selfEmployeeDetails?.annualIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  //     });
  //     this.salary = false
  //     this.isSalaried = false
  //     this.isSalary = false;
  //   }
  //   if (this.selectedCustomerData?.emailVerified === true) {
  //     this.salaryEmploymentForm.controls['pemail']?.disable();
  //     this.selfEmploymentForm.controls['pemail']?.disable();
  //   }
  //   if (this.selectedCustomerData?.documentList === null) {
  //     this.isSkip = true
  //   }
  //   else {
  //     this.isSkip = false
  //   }

  // }
  navigateEditPage(viewDataDelete) {
    // this.customerDetails = true;
    this.dialog.open(PleaseConfirmCustomerpopupComponent, { data: { viewDataDelete } })
  }

  removeCurrent() {
    let dialogRef3 = this.dialog.open(RemoveCurrentaddressComponent)
    dialogRef3.afterClosed().subscribe((res) => {
      if (res == 'yes') {
        this.currentAddressValue = null;
        this.isCurrentAddressMatched = null;
        this.showCurrentAddress = false;
        this.currentAddress.reset();
      }
    });
  }
  getImageName(s3FileName: string): string {
    if (s3FileName) {
      const imageName = s3FileName.replace(/^\d+_/, '');
      return imageName;
    }
    return '';
  }


  navigatepage() {
    this.router.navigate(['/new-customer'])
    this.customerDetails = true
  }
  navigateToAllcustomer(){
    this.router.navigate(['/sorting-filtering'])
  }
  truncateFileName(fileName: string): string {
    const maxLength = 35;
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      return fileName.substr(0, maxLength) + '...';
    }
  }

  goToPreviousTab() {
    if (this.selectedIndex > 0) {
      this.selectedIndex -= 1
    }
    else {
      this.router.navigate(['/customer-dashboard'])
    }
  }
  navigateToCreateProposalPage() {
    this.router.navigate(['./personal-details'])
  }
}