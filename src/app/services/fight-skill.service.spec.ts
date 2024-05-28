import { TestBed } from '@angular/core/testing';

import { FightSkillService } from './fight-skill.service';

describe('FightSkillService', () => {
  let service: FightSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FightSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
