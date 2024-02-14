import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomerPopupComponent } from './delete-customer-popup.component';

describe('DeleteCustomerPopupComponent', () => {
  let component: DeleteCustomerPopupComponent;
  let fixture: ComponentFixture<DeleteCustomerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCustomerPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCustomerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
