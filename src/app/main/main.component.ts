import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }
  hasWallet = false;

  ngOnInit(): void {
    this.hasWallet = this.authService.checkUserWallet();
  }

  requestInvite(){
    this.router.navigate(['/invite']);
  }

  checkInvites(){
    this.router.navigate(['/checkInvites']);
  }



}
