import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSuccessComponent } from './location-success.component';

describe('LocationSuccessComponent', () => {
  let component: LocationSuccessComponent;
  let fixture: ComponentFixture<LocationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
