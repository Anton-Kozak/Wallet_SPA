import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NowalletGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var token = this.authService.getToken();
    //console.log('No wallet guard is activated');
    if (token !== null) {
      //console.log('token exists');
      
      if (token.hasWallet === 'true') {
        //console.log('has wallet, trying to got to wallet home');
        
        this.router.navigate(['/wallet/home-wallet']);
        return false;
      }
      else {
        //console.log('Wallet is not found, going to no wallet section');
        return true;
      }
    }
    this.router.navigate(['/main/reg']);
    return false;
  }
}


