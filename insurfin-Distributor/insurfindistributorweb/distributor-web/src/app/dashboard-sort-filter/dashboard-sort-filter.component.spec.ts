import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSortFilterComponent } from './dashboard-sort-filter.component';

describe('DashboardSortFilterComponent', () => {
  let component: DashboardSortFilterComponent;
  let fixture: ComponentFixture<DashboardSortFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSortFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSortFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
