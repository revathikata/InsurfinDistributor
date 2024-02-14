import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendLinkPopupComponent } from './resend-link-popup.component';

describe('ResendLinkPopupComponent', () => {
  let component: ResendLinkPopupComponent;
  let fixture: ComponentFixture<ResendLinkPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendLinkPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResendLinkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
