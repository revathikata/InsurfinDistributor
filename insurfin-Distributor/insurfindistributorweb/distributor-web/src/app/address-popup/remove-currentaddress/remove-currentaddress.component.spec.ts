import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCurrentaddressComponent } from './remove-currentaddress.component';

describe('RemoveCurrentaddressComponent', () => {
  let component: RemoveCurrentaddressComponent;
  let fixture: ComponentFixture<RemoveCurrentaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveCurrentaddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveCurrentaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
