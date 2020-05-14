import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { User } from '../_model/user';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }
  signInForm: FormGroup;
  currentUserName?: string;
  isLoggedIn = false;
  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10),]),
      'userpass': new FormControl('', [Validators.required, Validators.minLength(4)])
    });
    //TODO: КАК НИБУДЬ узанть, правильно ли это сделано
    this.authService.checkLogin();
    this.authService.isLoggedIn.subscribe(result=>{
      this.isLoggedIn = result;
    })
  }2

  onSubmit() {
    const username = this.signInForm.value['username'];
    const password = this.signInForm.value['userpass']
    this.authService.login(username, password).subscribe((response: any) => {
      const user: User = JSON.parse(localStorage.getItem('currentUser'));
      this.currentUserName = user.username;
      this.router.navigate(['/home']);
      this.alertify.success("Welcome " + user.username);
    }, error=>{
      this.alertify.error(error.statusText);
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
