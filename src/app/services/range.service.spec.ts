import { TestBed } from '@angular/core/testing';

import { RangeService } from './range.service';

describe('RangeService', () => {
  let service: RangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
