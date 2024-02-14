import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProposalListComponent } from './customer-proposal-list.component';

describe('CustomerProposalListComponent', () => {
  let component: CustomerProposalListComponent;
  let fixture: ComponentFixture<CustomerProposalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProposalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerProposalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
