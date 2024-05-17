import { TestBed } from '@angular/core/testing';

import { CompetencesService } from './competencies.service';

describe('CompetencesService', () => {
  let service: CompetencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
