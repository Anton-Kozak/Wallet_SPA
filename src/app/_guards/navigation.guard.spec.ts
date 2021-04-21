import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../_services/auth.service';

import { NavigationGuard } from './navigation.guard';

describe('NavigationGuard', () => {
  let guard: NavigationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    guard = TestBed.inject(NavigationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
