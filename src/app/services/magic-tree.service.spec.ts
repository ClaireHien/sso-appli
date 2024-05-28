import { TestBed } from '@angular/core/testing';

import { MagicTreeService } from './magic-tree.service';


describe('MagicTreeService', () => {
  let service: MagicTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagicTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
