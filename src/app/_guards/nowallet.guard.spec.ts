import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../_services/auth.service';

import { NowalletGuard } from './nowallet.guard';

describe('NowalletGuard', () => {
  let guard: NowalletGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    guard = TestBed.inject(NowalletGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
