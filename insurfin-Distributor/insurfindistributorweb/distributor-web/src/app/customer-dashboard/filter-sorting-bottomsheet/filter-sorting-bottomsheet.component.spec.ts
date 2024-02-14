import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSortingBottomsheetComponent } from './filter-sorting-bottomsheet.component';

describe('FilterSortingBottomsheetComponent', () => {
  let component: FilterSortingBottomsheetComponent;
  let fixture: ComponentFixture<FilterSortingBottomsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSortingBottomsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSortingBottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
