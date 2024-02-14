import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansInProcessComponent } from './loans-in-process.component';

describe('LoansInProcessComponent', () => {
  let component: LoansInProcessComponent;
  let fixture: ComponentFixture<LoansInProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansInProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoansInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
