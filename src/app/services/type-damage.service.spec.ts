import { TestBed } from '@angular/core/testing';

import { TypeDamageService } from './type-damage.service';

describe('TypeDamageService', () => {
  let service: TypeDamageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDamageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
