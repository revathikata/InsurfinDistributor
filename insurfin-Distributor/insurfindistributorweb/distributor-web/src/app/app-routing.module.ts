import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileNumberComponent } from './mobile-number/mobile-number.component';
import { RegisterSuccessfullComponent } from './register/register-successfull/register-successfull.component';
import { RegisterComponent } from './register/register.component';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { ProposalStatusComponent } from './proposal-status/proposal-status.component';
import { ProposalSuccessfullComponent } from './proposal-successfull/proposal-successfull.component';
import { EnterNewPasswordComponent } from './enter-new-password/enter-new-password.component';
import { Login2Component } from './setup-password/login2/login2.component';
import { CustomerInformationComponent } from './customer-information/customer-information.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { NotificationsComponent } from './notifications/notifications.component';
import { DelinquentApplicationsComponent } from './customer-dashboard/delinquent-applications/delinquent-applications.component';
import { TotalLoanDisbursedComponent } from './customer-dashboard/total-loan-disbursed/total-loan-disbursed.component';
import { LoansRejectedComponent } from './customer-dashboard/loans-rejected/loans-rejected.component';
import { LoansInProcessComponent } from './customer-dashboard/loans-in-process/loans-in-process.component';
import { VerifyEmailComponent } from './verify-email-popup/verify-email/verify-email.component';
import { ReminderSentPopupComponent } from './customer-dashboard/loans-in-process/more-actions-popup/reminder-sent-popup/reminder-sent-popup.component';
import { PleaseConfirmPopupComponent } from './please-confirm-popup/please-confirm-popup.component';
import { ConformPopupComponent } from './customer-dashboard/loans-in-process/more-actions-popup/reminder-sent-popup/conform-popup/conform-popup.component';
import { CustomerSortingFilteringComponent } from './customer-dashboard/customer-sorting-filtering/customer-sorting-filtering.component';
import { FilterSortingBottomsheetComponent } from './customer-dashboard/filter-sorting-bottomsheet/filter-sorting-bottomsheet.component';
import { SignOutPopupComponent } from './customer-dashboard/sidenav/sign-out-popup/sign-out-popup.component';
import { ProfileComponent } from './customer-dashboard/sidenav/profile/profile.component';
import { UploadImagePopupComponent } from './customer-dashboard/sidenav/profile/upload-image-popup/upload-image-popup.component';
import { ViewCustomerDetailsComponent } from './customer-dashboard/view-customer-details/view-customer-details.component';
import { CustomerProposalListComponent } from './customer-dashboard/view-customer-details/customer-proposal-list/customer-proposal-list.component';
import { EditDeletePopupComponent } from './customer-dashboard/total-loan-disbursed/edit-delete-popup/edit-delete-popup.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { PrivacyPolicyComponent } from './Insurfin/privacy-policy/privacy-policy.component';
import { TermsOfServicesComponent } from './Insurfin/terms-of-services/terms-of-services.component';
import { CaptchaComponent } from './register/captcha/captcha.component';
import { EmailValidationPageComponent } from './mobile-number/email-validation-page/email-validation-page.component';
import { PleaseConfirmCustomerpopupComponent } from './please-confirm-customerpopup/please-confirm-customerpopup.component';
import { DataMismatchPopupComponent } from './data-mismatch-popup/data-mismatch-popup.component';
import { DashboardSortFilterComponent } from './dashboard-sort-filter/dashboard-sort-filter.component';

const routes: Routes = [
  {path:'', pathMatch:'full', component:Login2Component },
  {path:'login2', pathMatch:'full', component:Login2Component },
  {path:'first-login', pathMatch:'full', component:Login2Component },
  {path:'welcome',pathMatch:'full',component:WelcomePageComponent,canActivate:[AuthGuardGuard]},
  {path:'login',pathMatch:'full',component:MobileNumberComponent},
  {path:'register',pathMatch:'full',component:RegisterComponent,canActivate:[AuthGuardGuard]},
  {path:'customer-dashboard', pathMatch:'full',component:CustomerDashboardComponent,canActivate:[AuthGuardGuard]},
  {path:'registersuccess',pathMatch:'full',component:RegisterSuccessfullComponent,canActivate:[AuthGuardGuard]},
  {path:'terms-conditions',pathMatch:'full',component:TermsConditionsComponent,canActivate:[AuthGuardGuard]},
  {path:'reset-password',pathMatch:'full',component:ResetPasswordComponent},
  {path:'distributor-dashboard', pathMatch:'full', component:CustomerDashboardComponent,canActivate:[AuthGuardGuard]},
  {path:'new-customer', pathMatch:'full', component:NewCustomerComponent,canActivate:[AuthGuardGuard]},
  {path:'customer-info', pathMatch:'full', component:CustomerInformationComponent,canActivate:[AuthGuardGuard]},
  {path:'personal-details', pathMatch:'full', component:PersonalDetailsComponent,canActivate:[AuthGuardGuard]},
  {path:'proposal-success', pathMatch:'full', component:ProposalSuccessfullComponent,canActivate:[AuthGuardGuard]},
  {path:'proposal-status', pathMatch:'full', component:ProposalStatusComponent,canActivate:[AuthGuardGuard]},
  {path:'customer-details', pathMatch:'full', component:CustomerDetailsComponent,canActivate:[AuthGuardGuard]},
  {path:'enter-new-password', pathMatch:'full', component:EnterNewPasswordComponent},
  {path:'distributor-login', pathMatch:'full', component:Login2Component},
  {path:'notifications', pathMatch:'full', component:NotificationsComponent,canActivate:[AuthGuardGuard]},
  {path:'delinquent-applications', pathMatch:'full', component:DelinquentApplicationsComponent,canActivate:[AuthGuardGuard]},
  {path:'total-loans', pathMatch:'full', component:TotalLoanDisbursedComponent,canActivate:[AuthGuardGuard]},  
  {path:'loans-rejected', pathMatch:'full', component:LoansRejectedComponent,canActivate:[AuthGuardGuard]}, 
  {path:'loans-in-process', pathMatch:'full', component:LoansInProcessComponent,canActivate:[AuthGuardGuard]}, 
  {path:'sorting-filtering', pathMatch:'full', component:CustomerSortingFilteringComponent,canActivate:[AuthGuardGuard]},  
  {path:'filter-sort', pathMatch:'full', component:FilterSortingBottomsheetComponent,canActivate:[AuthGuardGuard]},  
  {path:'verify-email', pathMatch:'full', component:VerifyEmailComponent},  
  {path:'reminder-sent-popup', pathMatch:'full', component:ReminderSentPopupComponent,canActivate:[AuthGuardGuard]},    
  {path:'conform-popup', pathMatch:'full', component:ConformPopupComponent,canActivate:[AuthGuardGuard]},    
  {path:'sign-out-popup', pathMatch:'full', component:SignOutPopupComponent,canActivate:[AuthGuardGuard]},        
  {path:'profile', pathMatch:'full', component:ProfileComponent,canActivate:[AuthGuardGuard]},    
  {path:'upload-image-popup', pathMatch:'full', component:UploadImagePopupComponent,canActivate:[AuthGuardGuard]},    
  // { path: 'view-customer-details/:details', pathMatch: 'full', component: ViewCustomerDetailsComponent,canActivate:[AuthGuardGuard] },
  { path: 'view-customer-details', pathMatch: 'full', component: ViewCustomerDetailsComponent,canActivate:[AuthGuardGuard] },
  { path: 'customer-proposal-list/:customerId', pathMatch: 'full', component: CustomerProposalListComponent,canActivate:[AuthGuardGuard] },
  { path: 'edit-email', pathMatch: 'full', component: EditEmailComponent,canActivate:[AuthGuardGuard] },
  { path :'privacy-policy' , component: PrivacyPolicyComponent },
  { path :'terms-of-service' , component: TermsOfServicesComponent },
  {path:'captcha',pathMatch:'full',component:CaptchaComponent,canActivate:[AuthGuardGuard]},
  {path:'setUp-Password', pathMatch:'full', component:SetupPasswordComponent},
  {path:'sign-up', pathMatch:'full',component:MobileNumberComponent},
  {path:'emailValidation', pathMatch:'full',component:EmailValidationPageComponent,canActivate:[AuthGuardGuard]},
  {path:'customerconfirm-popup',pathMatch:'full',component:PleaseConfirmCustomerpopupComponent},
  {path:'data-mismatch',pathMatch:'full',component:DataMismatchPopupComponent},
  {path:'dashboardSortFilter',pathMatch:'full',component:DashboardSortFilterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
