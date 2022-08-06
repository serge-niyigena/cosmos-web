import { TestBed } from '@angular/core/testing';

import { DamagedService } from './damaged.service';

describe('DamagedService', () => {
  let service: DamagedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DamagedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
