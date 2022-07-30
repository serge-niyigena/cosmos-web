import { TestBed } from '@angular/core/testing';

import { UsageStatusService } from './usage-status.service';

describe('UsageStatusService', () => {
  let service: UsageStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsageStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
