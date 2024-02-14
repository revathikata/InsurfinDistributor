import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUploadedFileComponent } from './delete-uploaded-file.component';

describe('DeleteUploadedFileComponent', () => {
  let component: DeleteUploadedFileComponent;
  let fixture: ComponentFixture<DeleteUploadedFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUploadedFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUploadedFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
