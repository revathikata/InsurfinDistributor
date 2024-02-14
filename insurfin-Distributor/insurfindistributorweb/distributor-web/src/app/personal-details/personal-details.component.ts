import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { ProposalServiceService } from '../services/proposal-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {

  selectedIndex: number = 0;
  details!: FormGroup;
  Policydetails!: FormGroup;
  formJoin!: FormGroup
  productArray: any = [];
  InsurerArray: any = [];
  ProductTypeArray: any = [];
  allProductsArray: any = [];
  distributorId: any;
  UserId: any;
  distributorName: any;
  // rupees = '₹';
  premiumAmountValue: any;
  bankdetails!: FormGroup
  continuebtn: boolean = true
  
  addetails!: FormGroup
  paydeatils!: FormGroup
  verify: boolean = false
  payVia = false
  insurerBank = true



  bank: any = [
    "Hdfc Bank",
    "Icici Bank",
    "SBI Bank",
    "Axis Bank"
  ]

  account: any;
  insuranceId: any;
  InsurerBankDetails: any = [];
  IfscCode: any;
  ifsc: any = [];
  InsurerBankNames: any;
  prefeildCompany: any;
  customerId: any;
  selectedCompanyName: any;
  accountNumber: any[] = [];
  proposalError: any;
  ifscCode: any;
  limitReached: boolean = false;
  isButtonEnabled: boolean = false;
  isPremium: boolean = false;
  isOthers: boolean = false;
  uuid: any;
  getName: any;
  customerUuid: any;
  pickedCompanyname:any;
  proposalNumberError: any;
  BtnDisable: boolean = false;

  constructor(public dialog: MatDialog, private fb: FormBuilder,
    private ProposalData: ProposalServiceService,
    private route: ActivatedRoute,
    private router: Router, private formbuilder: FormBuilder, private forms: FormBuilder, private ffbb: FormBuilder ,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // this.distributorId = JSON.parse(localStorage.getItem('getdistributorId') ?? '')
    // this.UserId = JSON.parse(localStorage.getItem('getuserId') ?? '')
    // this.customerId =JSON.parse(localStorage.getItem('customerId') ?? '')

    // this.distributorName = JSON.parse(localStorage.getItem('getDistributorName') ?? '')
    this.details = this.fb.group({
      chooseproduct: [, Validators.required],
      chooseinsurer: [, Validators.required],
      chooseptype: [, Validators.required],
      product: [, Validators.required],
      proposalnumber: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9\/-]*(?<![\/-])$/)
      , Validators.minLength(8),Validators.maxLength(16)]],
      premium: ["", Validators.pattern("^(0?[5-9]|1[0-9]|2[0-5])$")],
      productName: ["", Validators.pattern("^\\S.[a-zA-Z_ ]*$")],
    }),
      this.Policydetails = this.fb.group({
        policyTensure: ["", [Validators.required, Validators.pattern("^(0[1-9]|[1-9][0-9]?)$")]],
        PremiumAmount: ["", Validators.required],
      }),
      this.bankdetails = this.formbuilder.group({
        prefeildCompanyName: [{ value: this.selectedCompanyName, disabled: true }, Validators.required],
        bank: [, Validators.required],
        getIfscCode: [{ value: this.ifsc, disabled: true }, [Validators.required, Validators.pattern("^[A-Z]{4}0[A-Z0-9a-z]{6}$")]],
        account: [, Validators.required]
      }),
      this.addetails = this.fb.group({
        // companyname: ["" || this.selectedCompanyName, [Validators.required, Validators.pattern(/^[a-zA-Z0-9&./ -]+$/)]],
        companyname: [{value: this.pickedCompanyname, disabled:true}, Validators.required],
        bankname:["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9&./ -]+$/)]],
        ifsc: ["", [Validators.required, Validators.pattern("^[A-Z]{4}0[A-Z0-9a-z]{6}$")]],
        accountnumber: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9]{9,18}$")
      ]]
      }),
      this.paydeatils = this.ffbb.group({
        paylink: ["", Validators.required]
      })
    this.getProductDropdownsData();
  }

  
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }

  openDialog() {
    if (this.selectedIndex > 0) {
      this.selectedIndex -= 1
    }else{
      this.dialog.open(ConfirmPopupComponent, {
        width: '329px'
      });
    }
  }
  continueToPolicyInformation() {
    this.selectedIndex += 1
  }
 

  restrictToNumbers(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    input.value = value.replace(/[^0-9]/g, '');
  }
  getProductDropdownsData() {
    this.ProposalData.proposalAllProducts().subscribe({
      next: (res: any) => {
        if (res) {
          this.productArray = res.data;
        } else {
          this.productArray = [];
        }


      },
      error: (err) => {
        console.warn(err)
      }
    });
  }
  selectedProduct() {
    this.InsurerArray = [];
    this.ProductTypeArray = [];
    this.allProductsArray = [];
    this.details.patchValue({ chooseinsurer: null });
    this.details.patchValue({ chooseptype: null });
    this.details.patchValue({ product: null });
    this.getInsurerDropdownsData();
    this.clearInputValues();
  }
  getInsurerDropdownsData() {
    this.ProposalData.getInsurerData(this.details.controls['chooseproduct'].value).subscribe({
      next: (res: any) => {
        this.insuranceId = res.data
        // console.log(this.insuranceId, 'data');
        this.insuranceId = this.insuranceId.filter((tab: any) => {
          return tab.insurerId

        });
        localStorage.setItem('insuranceId', this.insuranceId)
        if (res) {
          this.InsurerArray = res.data;
        } else {
          this.InsurerArray = [];
        }


      },
      error: (err) => {
        console.warn(err)
      }
    });
  }
  selectedInsurer(id: any) {
    // alert(id)
    this.InsurerArray.forEach((element: any) => {
      if (element.insurerId == id) {
        this.selectedCompanyName = element.insurer
        this.pickedCompanyname = element.insurer;
      }
    })
    this.bankdetails.patchValue({ prefeildCompanyName: this.selectedCompanyName })
    this.addetails.patchValue({ companyname: this.pickedCompanyname});
    this.ProductTypeArray = [];
    this.allProductsArray = [];
    this.details.patchValue({ chooseptype: null});
    this.details.patchValue({ product: null});
    this.getProductTypeDropdownsData();
    this.clearInputValues();
  }
  getProductTypeDropdownsData() {
    this.ProposalData.getProductTypeData(this.details.controls['chooseinsurer'].value).subscribe({
      next: (res: any) => {
        if (res) {
          this.ProductTypeArray = res.data;
          this.ProposalData.getAllBankDetails(this.details.controls['chooseinsurer'].value).subscribe((res: any) => {
          if(res?.data.length === 0){
            this.verify = false
            this.insurerBank = true
            this.payVia = false
          }
          else{
            this.verify = true
            this.insurerBank = false
            this.payVia = false
           if(res?.data.length === 1){
            this.bankdetails.patchValue({bank : res?.data[0].bankName})
            this.bankdetails.patchValue({account : res?.data[0].accounts[0].accountNumber})
            this.bankdetails.patchValue({getIfscCode : res?.data[0].accounts[0].ifsc_code})
           };
          }
        });
          // else{
          //   this.verify = true
          //   this.insurerBank = false
          //   this.payVia = false
          // }
        } else {
          this.ProductTypeArray = [];
        }
      },
      error: (err) => {
        console.warn(err)
      }
    });
  }
  selectedProductType() {
    this.allProductsArray = [];
    this.details.patchValue({ product: null});
    this.getProductsDropdownsData();
    this.clearInputValues();
  }
  getProductsDropdownsData() {
    this.ProposalData.getAllProductsData(this.details.controls['chooseptype'].value).subscribe({
      next: (res: any) => {
        if (res) {
          this.allProductsArray = res.data;

        } else {
          this.allProductsArray = [];
        }
      },
      error: (err) => {
        console.warn(err)
      }
    });
  }
  PremiumAmountValue(event: any) {
    this.premiumAmountValue = event.target.value;
  }
  onInputChange(){
    this.proposalNumberError = ''
  }
  SaveData() {
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    this.uuid = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    this.customerUuid =  JSON.parse(sessionStorage.getItem('customerUuid') ?? 'null');
    this.getName = JSON.parse(sessionStorage.getItem('SetName') ?? 'null');
    // this.spinner.show();
    const FormValue = this.details.value;
    const PolicyFormValue = this.Policydetails.value;
    let data = {
      bankAccountDetails: {
        accountNumber: this.addetails.controls['accountnumber'].value || this.bankdetails.controls['account'].value,
        bankName: this.addetails.controls['bankname'].value || this.bankdetails.controls['bank'].value,
        companyName: this.addetails.controls['companyname'].value || this.bankdetails.controls['prefeildCompanyName'].value,
        ifscCode: this.addetails.controls['ifsc'].value || this.bankdetails.controls['getIfscCode'].value,
      },
      createdBy: this.getName,
      customerId: this.customerUuid,
      distributorId: this.uuid,
      insurerId: this.details.controls['chooseinsurer'].value,
      lastUpdatedBy: this.getName,
      productId: this.details.controls['product'].value,
      productTypeId: this.details.controls['chooseptype'].value,
      proposalNumber: this.details.controls['proposalnumber'].value,
      premiumPayingTerm: this.details.controls['premium'].value,
      policyTenure: this.Policydetails.controls['policyTensure'].value,
      premiumAmount: this.Policydetails.controls['PremiumAmount'].value.replace(/,/g, ''),
      paymentLink: this.paydeatils.controls['paylink'].value
    }
    this.ProposalData.SaveProposalData(data).subscribe({
      next: (res: any) => {
        if (res) {
          if (res?.error == false) {
            this.router.navigate(['/proposal-success'])
            res.data
            sessionStorage.setItem('proposalnumber',JSON.stringify(this.details.controls['proposalnumber'].value))
            sessionStorage.setItem('proposalId',JSON.stringify(res.data.proposalId))
          }
          else {
            if(res?.message == 'Proposal Already Exist with this Proposal Number')
            {
              this.proposalNumberError = res?.message
              this.selectedIndex = 0
            }
            else{
              this.proposalError = res?.message
            }
          }
        }
      },
      error: (err) => {
        this.proposalError = "No Active Internet Found, Please connect to active internet Connection."
      },
      // complete: () => {
      //   this.spinner.hide();
      // }
    });
  }
  AddProposal() {
    this.selectedIndex += 1
    if (this.Policydetails.valid && this.premiumAmountValue <= 100000) {
  
    } else {

    }
  }
  bankdropdwns(item: any) {
    // console.log(item);
    this.ProposalData.getAllBankDetails(this.details.controls['chooseinsurer'].value).subscribe((res: any) => {
      if (res) {
        this.InsurerBankDetails = res.data;
        // const bankNames = this.getIndexOfDocument(InsurerBankDetails[index])
    
        let InsurerBankNames = new Set()
        this.InsurerBankDetails.forEach(x => {
          InsurerBankNames.add(x.bankName)

        })
        this.InsurerBankNames = InsurerBankNames
        let accoutnumber = new Set()
        this.InsurerBankDetails.forEach(x => {
          if (x.bankName == this.bankdetails.controls['bank'].value) {
            this.accountNumber = x.accounts;
            // accoutnumber.add(x.accounts)
            // console.log(this.ifsc, 'ifsc');
            // console.log(this.accountNumber, 'accounts');
            // this.accountNumber = accoutnumber
            // this.bankdetails.patchValue({account: this.accountNumber}
            // this.bankdetails.patchValue({getIfscCode: this.ifsc})
          }
          //  if(this.accountNumber == this.bankdetails.controls['account'].value){ 
          //   this.ifsc = x.accounts
          //   console.log(this.ifsc,'ifsc');
          //  }
        })

      } else {
        this.InsurerBankDetails = [];
      }

    })
  }
  onBankChange(event: any) {
    this.bankdetails.controls['account'].reset()
    this.bankdetails.controls['getIfscCode'].reset();
  }
  selectBankAccountNum(event) {

    const selectedAc = this.accountNumber.find(item => item.accountNumber === event);

    this.bankdetails.patchValue({ getIfscCode: selectedAc.ifsc_code })
    // console.log(event)
  }
  prefeildBankDetails() {

  }
  BankContinue() {
    this.SaveData()
  }
  addBankDetails() {
    this.verify = false
    this.insurerBank = !this.insurerBank
    this.payVia = false

  }
  enterPayment() {
    this.payVia = true
    this.insurerBank = false
    this.verify = false
  }
  checkLimit(event) {
    this.premiumAmountValue = event.target.value.replace(/[^0-9]/g, '');

    if (parseInt(this.premiumAmountValue) > 100000) {
      this.limitReached = true;
    } else {
      this.limitReached = false;
    }
  }
  onSlideChange(event: any) {
    const rawValue = event.target.value;
  const formattedValue = Number(rawValue).toLocaleString('en-IN');
  this.premiumAmountValue = formattedValue;
  this.Policydetails.get('PremiumAmount')?.setValue(this.premiumAmountValue);
  this.premiumAmountValue=Number(rawValue)
  }

  isLifeProductSelected(): boolean {
    const selectedProductId = this.details.get('chooseproduct')?.value;
    const selectedProduct = this.productArray.find(product => product.insuranceTypeId === selectedProductId);
    const isLifeSelected = selectedProduct?.insuranceTypeName === 'Life';
    this.isPremium = isLifeSelected;
    this.details.get('premium')?.updateValueAndValidity();
    return isLifeSelected;
  }

  isOthersSelected(): boolean {
    const selectProduct = this.details.get('product')?.value;
    const isOthersSelected = selectProduct === 'others';
    this.isOthers = isOthersSelected;
    this.details.get('productName')?.updateValueAndValidity();
    return isOthersSelected;
  }
  private clearInputValues() {
    this.details.get('productName')?.patchValue(null);
    this.details.get('proposalnumber')?.patchValue(null);
    this.details.get('premium')?.patchValue(null);
    this.Policydetails.get('policyTensure')?.patchValue(null)
    this.Policydetails.get('PremiumAmount')?.patchValue(null)
  }

  selectedProductOther() {
    this.clearInputValues();
  }
} 
