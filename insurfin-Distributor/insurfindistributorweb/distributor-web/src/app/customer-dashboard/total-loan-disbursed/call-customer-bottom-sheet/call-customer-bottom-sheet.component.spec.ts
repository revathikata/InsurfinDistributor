import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallCustomerBottomSheetComponent } from './call-customer-bottom-sheet.component';

describe('CallCustomerBottomSheetComponent', () => {
  let component: CallCustomerBottomSheetComponent;
  let fixture: ComponentFixture<CallCustomerBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallCustomerBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallCustomerBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
