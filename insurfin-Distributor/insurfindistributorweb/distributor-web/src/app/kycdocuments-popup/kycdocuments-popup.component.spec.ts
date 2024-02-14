import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycdocumentsPopupComponent } from './kycdocuments-popup.component';

describe('KycdocumentsPopupComponent', () => {
  let component: KycdocumentsPopupComponent;
  let fixture: ComponentFixture<KycdocumentsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycdocumentsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycdocumentsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
