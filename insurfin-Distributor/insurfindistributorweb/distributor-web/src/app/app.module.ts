import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobileNumberComponent } from './mobile-number/mobile-number.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterSuccessfullComponent } from './register/register-successfull/register-successfull.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';

import { MatNativeDateModule } from '@angular/material/core';
import { EnterNewPasswordComponent } from './enter-new-password/enter-new-password.component';
import { EmailSuccessPopupComponent } from './register/email-success-popup/email-success-popup.component';
import { WebcamModule } from 'ngx-webcam';
import { WebCamComponent } from './register/web-cam/web-cam.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { PleaseConfirmPopupComponent } from './please-confirm-popup/please-confirm-popup.component';
import { ProposalStatusComponent } from './proposal-status/proposal-status.component';
import { ProposalSuccessfullComponent } from './proposal-successfull/proposal-successfull.component';
import { VerifyEmailPopupComponent } from './verify-email-popup/verify-email-popup.component';
import { Login2Component } from './setup-password/login2/login2.component';
import { CustomerInformationComponent } from './customer-information/customer-information.component';
import { SideNavSectionComponent } from './shared/side-nav-section/side-nav-section.component';
import { KycdocumentsPopupComponent } from './kycdocuments-popup/kycdocuments-popup.component';
import { LocationPopupComponent } from './location-popup/location-popup.component';
import { AddressPopupComponent } from './address-popup/address-popup.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AppCurrencyFormatDirective } from './services/app-currency-format.directive';
import { AadhaarFormatDirective } from './services/aadhaar-format.directive';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TotalLoanDisbursedComponent } from './customer-dashboard/total-loan-disbursed/total-loan-disbursed.component';
import { DelinquentApplicationsComponent } from './customer-dashboard/delinquent-applications/delinquent-applications.component';
import { SidenavComponent } from './customer-dashboard/sidenav/sidenav.component';
import { LoansRejectedComponent } from './customer-dashboard/loans-rejected/loans-rejected.component';
import { LoansInProcessComponent } from './customer-dashboard/loans-in-process/loans-in-process.component';
import { ResendLinkPopupComponent } from './customer-dashboard/loans-in-process/resend-link-popup/resend-link-popup.component';
import { MoreActionsPopupComponent } from './customer-dashboard/loans-in-process/more-actions-popup/more-actions-popup.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CustomerSearchComponent } from './customer-dashboard/customer-search/customer-search.component';
import { RemoveCurrentaddressComponent } from './address-popup/remove-currentaddress/remove-currentaddress.component';
import { LocationSuccessComponent } from './address-popup/location-success/location-success.component';
import { VerifyEmailComponent } from './verify-email-popup/verify-email/verify-email.component';
import { ReminderSentPopupComponent } from './customer-dashboard/loans-in-process/more-actions-popup/reminder-sent-popup/reminder-sent-popup.component';
import { ConformPopupComponent } from './customer-dashboard/loans-in-process/more-actions-popup/reminder-sent-popup/conform-popup/conform-popup.component';
import { CustomerSortingFilteringComponent } from './customer-dashboard/customer-sorting-filtering/customer-sorting-filtering.component';
import { FilterSortingBottomsheetComponent } from './customer-dashboard/filter-sorting-bottomsheet/filter-sorting-bottomsheet.component';
import { DeleteUploadedFileComponent } from './delete-uploaded-file/delete-uploaded-file.component';
import { PanMaskDirective } from './services/pan-mask.directive';
import { SignOutPopupComponent } from './customer-dashboard/sidenav/sign-out-popup/sign-out-popup.component';
import { CallCustomerBottomSheetComponent } from './customer-dashboard/total-loan-disbursed/call-customer-bottom-sheet/call-customer-bottom-sheet.component';
import { ProfileComponent } from './customer-dashboard/sidenav/profile/profile.component';
import { UploadImagePopupComponent } from './customer-dashboard/sidenav/profile/upload-image-popup/upload-image-popup.component';
import { EditDeletePopupComponent } from './customer-dashboard/total-loan-disbursed/edit-delete-popup/edit-delete-popup.component';
// import { PleaseConformCustomerpopupComponent } from './customer-dashboard/total-loan-disbursed/edit-delete-popup/please-conform-customerpopup/please-conform-customerpopup.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ViewCustomerDetailsComponent } from './customer-dashboard/view-customer-details/view-customer-details.component';
import { CustomerProposalListComponent } from './customer-dashboard/view-customer-details/customer-proposal-list/customer-proposal-list.component';
import { ExistingCustomerPopupComponent } from './existing-customer-popup/existing-customer-popup.component';
import { PipeFilterPipe } from './pipe-filter.pipe';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { PrivacyPolicyComponent } from './Insurfin/privacy-policy/privacy-policy.component';
import { TermsOfServicesComponent } from './Insurfin/terms-of-services/terms-of-services.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { MatStepperModule } from '@angular/material/stepper';
import { SuccessPopupComponent } from './customer-details/success-popup/success-popup.component';
import { CaptchaComponent } from './register/captcha/captcha.component';
import { PleaseConfirmPersonalDetailsPopupComponent } from './register/please-confirm-personal-details-popup/please-confirm-personal-details-popup.component';
import { EmailValidationPageComponent } from './mobile-number/email-validation-page/email-validation-page.component';
import { PleaseConfirmCustomerpopupComponent } from './please-confirm-customerpopup/please-confirm-customerpopup.component';
import { DeleteCustomerPopupComponent } from './new-customer/delete-customer-popup/delete-customer-popup.component';
import { DataMismatchPopupComponent } from './data-mismatch-popup/data-mismatch-popup.component';
import { DashboardSortFilterComponent } from './dashboard-sort-filter/dashboard-sort-filter.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    MobileNumberComponent,
    RegisterComponent,
    RegisterSuccessfullComponent,
    TermsConditionsComponent,
    EnterNewPasswordComponent,
    EmailSuccessPopupComponent,
    WebCamComponent,
    SetupPasswordComponent,
    ResetPasswordComponent,
    ConfirmPopupComponent,
    CustomerDashboardComponent,
    CustomerDetailsComponent,
    NewCustomerComponent,
    LoansInProcessComponent,
    PersonalDetailsComponent,
    PleaseConfirmPopupComponent,
    ProposalStatusComponent,
    ProposalSuccessfullComponent,
    VerifyEmailPopupComponent,
    Login2Component,
    CustomerInformationComponent,
    SideNavSectionComponent,
    KycdocumentsPopupComponent,
    LocationPopupComponent,
    AddressPopupComponent,
    DatePickerComponent,
    AppCurrencyFormatDirective,
    NotificationsComponent,
    TotalLoanDisbursedComponent,
    DelinquentApplicationsComponent,
    SidenavComponent,
    LoansRejectedComponent,
    ResendLinkPopupComponent,
    MoreActionsPopupComponent,
    CustomerSearchComponent,
    RemoveCurrentaddressComponent,
    LocationSuccessComponent,
    AadhaarFormatDirective,
    VerifyEmailComponent,
    ReminderSentPopupComponent,
    ConformPopupComponent,
    CustomerSortingFilteringComponent,
    FilterSortingBottomsheetComponent,
    DeleteUploadedFileComponent,
    PanMaskDirective,
    SignOutPopupComponent,
    CallCustomerBottomSheetComponent,
    ProfileComponent,
    UploadImagePopupComponent,
    EditDeletePopupComponent,
    // PleaseConformCustomerpopupComponent,
    FilterPipe,
    ViewCustomerDetailsComponent,
    CustomerProposalListComponent,
    ExistingCustomerPopupComponent,
    PipeFilterPipe,
    EditEmailComponent,
    PrivacyPolicyComponent,
    TermsOfServicesComponent,
    SuccessPopupComponent,
    CaptchaComponent,
    PleaseConfirmPersonalDetailsPopupComponent,
    EmailValidationPageComponent,
    PleaseConfirmCustomerpopupComponent,
    DeleteCustomerPopupComponent,
    DataMismatchPopupComponent,
    DashboardSortFilterComponent
  ],
  entryComponents: [DatePickerComponent],


  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    HttpClientModule,
    NgOtpInputModule,
    NgxOtpInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    WebcamModule,
    NgSelectModule,
    MatRadioModule,
    MatSliderModule,
    MatCardModule,
    NgxSpinnerModule,
    MatBadgeModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatBottomSheetModule,
    MatStepperModule,
    BackButtonDisableModule.forRoot()

  ],
  providers: [
    DatePipe,{
    provide: MatDialogRef,
    useValue: {}
  }, {
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' }
  },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
