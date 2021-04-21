import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../_services/auth.service';

import { RegGuard } from './reg.guard';

describe('RegGuard', () => {
  let guard: RegGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    guard = TestBed.inject(RegGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
