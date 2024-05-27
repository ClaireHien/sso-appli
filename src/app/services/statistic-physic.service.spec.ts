import { TestBed } from '@angular/core/testing';

import { StatisticPhysicService } from './statistic-physic.service';

describe('StatisticPhysicService', () => {
  let service: StatisticPhysicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticPhysicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
