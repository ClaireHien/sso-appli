import { TestBed } from '@angular/core/testing';

import { StatisticMagicService } from './statistic-magic.service';

describe('StatisticMagicService', () => {
  let service: StatisticMagicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticMagicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
