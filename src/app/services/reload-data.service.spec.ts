import { TestBed } from '@angular/core/testing';

import { ReloadDataService } from './reload-data.service';

describe('ReloadDataService', () => {
  let service: ReloadDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReloadDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
