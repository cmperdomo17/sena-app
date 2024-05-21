import { TestBed } from '@angular/core/testing';

import { UserTeacherService } from './user-teacher.service';

describe('UserTeacherService', () => {
  let service: UserTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
