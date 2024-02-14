import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseConfirmPersonalDetailsPopupComponent } from './please-confirm-personal-details-popup.component';

describe('PleaseConfirmPersonalDetailsPopupComponent', () => {
  let component: PleaseConfirmPersonalDetailsPopupComponent;
  let fixture: ComponentFixture<PleaseConfirmPersonalDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaseConfirmPersonalDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PleaseConfirmPersonalDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
