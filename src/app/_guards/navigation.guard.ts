import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var token = this.authService.getToken();
    console.log('Navigation guard is activated');
    if (token !== null) {

      if (new Date(token.exp * 1000).toUTCString() > new Date().toUTCString()) {
        console.log("Has token", token);
        console.log('Expiration', new Date(token.exp * 1000));
        console.log('Current time', new Date());
        if (token.hasWallet === 'true') {
          return true;
        }
      }
      console.log('Forced logout');

      this.authService.logout();
      this.router.navigate(['/main/reg']);
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var token = this.authService.getToken();
    console.log('Navigation guard is activated');
    if (token !== null) {

      if (new Date(token.exp * 1000) > new Date()) {
        // console.log("Has token", token);
        // console.log('Expiration', new Date(token.exp * 1000));
        // console.log('Current time', new Date());
        if (token.hasWallet === 'true') {
          return true;
        }
      }
      console.log('Forced logout');

      this.authService.logout();
      this.router.navigate(['/main']);
      return false;
    }
  }
}
