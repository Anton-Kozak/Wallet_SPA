import { TestBed } from '@angular/core/testing';

import { NowalletGuard } from './nowallet.guard';

describe('NowalletGuard', () => {
  let guard: NowalletGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NowalletGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
