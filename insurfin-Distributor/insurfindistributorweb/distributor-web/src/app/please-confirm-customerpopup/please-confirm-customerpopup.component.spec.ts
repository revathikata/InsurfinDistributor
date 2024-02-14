import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseConfirmCustomerpopupComponent } from './please-confirm-customerpopup.component';

describe('PleaseConfirmCustomerpopupComponent', () => {
  let component: PleaseConfirmCustomerpopupComponent;
  let fixture: ComponentFixture<PleaseConfirmCustomerpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaseConfirmCustomerpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PleaseConfirmCustomerpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
