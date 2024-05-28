import { TestBed } from '@angular/core/testing';

import { CraftService } from './craft.service';

describe('CraftService', () => {
  let service: CraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CraftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
