import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelinquentApplicationsComponent } from './delinquent-applications.component';

describe('DelinquentApplicationsComponent', () => {
  let component: DelinquentApplicationsComponent;
  let fixture: ComponentFixture<DelinquentApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelinquentApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelinquentApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
