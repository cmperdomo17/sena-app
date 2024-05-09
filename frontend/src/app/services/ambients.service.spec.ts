import { TestBed } from '@angular/core/testing';

import { AmbientsService } from './ambients.service';

describe('AmbientsService', () => {
  let service: AmbientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmbientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
