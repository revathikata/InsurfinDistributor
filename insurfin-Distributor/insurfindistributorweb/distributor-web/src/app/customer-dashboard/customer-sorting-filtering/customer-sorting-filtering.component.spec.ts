import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSortingFilteringComponent } from './customer-sorting-filtering.component';

describe('CustomerSortingFilteringComponent', () => {
  let component: CustomerSortingFilteringComponent;
  let fixture: ComponentFixture<CustomerSortingFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSortingFilteringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSortingFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
