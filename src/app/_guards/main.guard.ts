import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { };
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var token = this.authService.getToken();
    //console.log('Main guard is activated');
    if (token !== null) {
      if (token.hasWallet === 'true') {
        //console.log('Main guard has wallet true');

        if (this.router.url !== '/') {
         // console.log('router is not /');
          this.router.navigate([this.router.url]);
        }
        else {
          //console.log('main guard going to home wallet');
          this.router.navigate(['/wallet/home-wallet']);
        }
        return false;
      }
      return true;
    }
    //console.log('no token found');

    return true;
  }
}
