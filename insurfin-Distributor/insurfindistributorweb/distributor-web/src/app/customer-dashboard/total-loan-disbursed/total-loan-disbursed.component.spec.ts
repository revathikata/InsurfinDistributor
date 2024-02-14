import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalLoanDisbursedComponent } from './total-loan-disbursed.component';

describe('TotalLoanDisbursedComponent', () => {
  let component: TotalLoanDisbursedComponent;
  let fixture: ComponentFixture<TotalLoanDisbursedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalLoanDisbursedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalLoanDisbursedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
