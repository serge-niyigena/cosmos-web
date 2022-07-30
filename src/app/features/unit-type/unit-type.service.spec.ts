import { TestBed } from '@angular/core/testing';

import { UnitTypeService } from './unit-type.service';

describe('UnitTypeService', () => {
  let service: UnitTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
