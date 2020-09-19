import { TestBed } from '@angular/core/testing';

import { RegGuard } from './reg.guard';

describe('RegGuard', () => {
  let guard: RegGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
