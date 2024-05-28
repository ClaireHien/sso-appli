import { TestBed } from '@angular/core/testing';

import { NeutralSkillService } from './neutral-skill.service';

describe('NeutralSkillService', () => {
  let service: NeutralSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeutralSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
