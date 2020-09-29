import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import * as AOS from 'aos';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private authService: AuthService, private titleService: Title) { }

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
