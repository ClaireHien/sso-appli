import { TestBed } from '@angular/core/testing';

import { CraftSkillService } from './craft-skill.service';

describe('CraftSkillService', () => {
  let service: CraftSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CraftSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
