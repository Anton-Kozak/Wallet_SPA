import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { User } from '../_model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  signInForm: FormGroup;
  currentUserName?: string;
  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10),]),
      'userpass': new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  onSubmit() {
    const username = this.signInForm.value['username'];
    const password = this.signInForm.value['userpass']
    this.authService.login(username, password).subscribe((response: any) => {
      const user: User = JSON.parse(localStorage.getItem('currentUser'));
      this.currentUserName = user.userName;
      this.router.navigate(['/main']);
    })
  }
  loggedIn(): boolean {
    return this.authService.checkLogin();
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

}
