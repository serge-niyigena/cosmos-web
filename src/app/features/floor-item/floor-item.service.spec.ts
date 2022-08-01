import { TestBed } from '@angular/core/testing';

import { FloorItemService } from './floor-item.service';

describe('FloorItemService', () => {
  let service: FloorItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloorItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
