import { TestBed } from '@angular/core/testing';

import { ProjectFloorService } from './project-floor.service';

describe('ProjectFloorService', () => {
  let service: ProjectFloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFloorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
