import { TestBed } from '@angular/core/testing';

import { WeaponTreeService } from './weapon-tree.service';

describe('WeaponTreeService', () => {
  let service: WeaponTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeaponTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
