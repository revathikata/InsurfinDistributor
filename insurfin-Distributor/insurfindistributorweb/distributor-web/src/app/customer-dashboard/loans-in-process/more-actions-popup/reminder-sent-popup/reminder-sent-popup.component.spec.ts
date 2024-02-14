import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderSentPopupComponent } from './reminder-sent-popup.component';

describe('ReminderSentPopupComponent', () => {
  let component: ReminderSentPopupComponent;
  let fixture: ComponentFixture<ReminderSentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderSentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderSentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
