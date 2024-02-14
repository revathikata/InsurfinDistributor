import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansRejectedComponent } from './loans-rejected.component';

describe('LoansRejectedComponent', () => {
  let component: LoansRejectedComponent;
  let fixture: ComponentFixture<LoansRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansRejectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoansRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
