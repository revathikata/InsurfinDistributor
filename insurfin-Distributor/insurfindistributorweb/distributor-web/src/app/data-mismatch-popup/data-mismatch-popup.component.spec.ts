import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMismatchPopupComponent } from './data-mismatch-popup.component';

describe('DataMismatchPopupComponent', () => {
  let component: DataMismatchPopupComponent;
  let fixture: ComponentFixture<DataMismatchPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataMismatchPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataMismatchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
