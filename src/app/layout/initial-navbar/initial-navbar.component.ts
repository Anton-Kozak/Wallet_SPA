import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-initial-navbar',
  templateUrl: './initial-navbar.component.html',
  styleUrls: ['./initial-navbar.component.css']
})
export class InitialNavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  isSignedIn: boolean;
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(res => {
      this.isSignedIn = res;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/main/reg']);
  }
}
