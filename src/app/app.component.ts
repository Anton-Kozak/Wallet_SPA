import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private authService: AuthService) { }

  hasWallet = false;
  isAuthorized = false;

  ngOnInit(): void {
    AOS.init({});
    this.authService.hasWallet.subscribe(res => {
      this.hasWallet = res;
    })
    this.authService.isLoggedIn.subscribe(res => {
      this.isAuthorized = res;
    });
    console.log(this.hasWallet);
    console.log(this.isAuthorized);


  }

}
