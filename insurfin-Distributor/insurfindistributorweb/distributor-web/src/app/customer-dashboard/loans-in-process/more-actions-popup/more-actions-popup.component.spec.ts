import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreActionsPopupComponent } from './more-actions-popup.component';

describe('MoreActionsPopupComponent', () => {
  let component: MoreActionsPopupComponent;
  let fixture: ComponentFixture<MoreActionsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreActionsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreActionsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
