import { TestBed } from '@angular/core/testing';

import { ProposalServiceService } from './proposal-service.service';

describe('ProposalServiceService', () => {
  let service: ProposalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProposalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
