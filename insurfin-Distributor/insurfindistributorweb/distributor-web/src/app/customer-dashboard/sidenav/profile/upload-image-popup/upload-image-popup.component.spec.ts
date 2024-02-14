import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImagePopupComponent } from './upload-image-popup.component';

describe('UploadImagePopupComponent', () => {
  let component: UploadImagePopupComponent;
  let fixture: ComponentFixture<UploadImagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadImagePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
