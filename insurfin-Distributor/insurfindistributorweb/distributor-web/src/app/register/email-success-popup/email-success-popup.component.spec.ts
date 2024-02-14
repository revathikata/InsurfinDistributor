import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSuccessPopupComponent } from './email-success-popup.component';

describe('EmailSuccessPopupComponent', () => {
  let component: EmailSuccessPopupComponent;
  let fixture: ComponentFixture<EmailSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSuccessPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
