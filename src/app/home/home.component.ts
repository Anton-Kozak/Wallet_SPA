import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  isAuthorized = false;
  hasWallet = false;
  //TODO: имя пользователя показывать при логине
  userName: string;
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(result=>{
      this.isAuthorized = result;
      console.log("Is authorized: " + this.isAuthorized);
    });
    this.authService.hasWallet.subscribe(result=>{
      this.hasWallet = result;
      console.log("Has wallet: " + this.hasWallet);
    })
  }

  goToRegistration(){
    this.router.navigate(['/register']);
  }

  goToWallet(){
    this.router.navigate(['/main']);
  }

  goToWalletCreation(){
    this.router.navigate(['/createNewWallet']);
  }

  requestWalletAccess(){
    this.router.navigate(['requestAccess']);
  }

  checkInvites(){
    this.router.navigate(['checkInvites']);
  }

}
