import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalSuccessfullComponent } from './proposal-successfull.component';

describe('ProposalSuccessfullComponent', () => {
  let component: ProposalSuccessfullComponent;
  let fixture: ComponentFixture<ProposalSuccessfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalSuccessfullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalSuccessfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
