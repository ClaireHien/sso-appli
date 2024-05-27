import { TestBed } from '@angular/core/testing';

import { StereotypeService } from './stereotype.service';

describe('StereotypeService', () => {
  let service: StereotypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StereotypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
