import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseConfirmPopupComponent } from './please-confirm-popup.component';

describe('PleaseConfirmPopupComponent', () => {
  let component: PleaseConfirmPopupComponent;
  let fixture: ComponentFixture<PleaseConfirmPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaseConfirmPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PleaseConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
