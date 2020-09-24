import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-signin',
  templateUrl: './signup-signin.component.html',
  styleUrls: ['./signup-signin.component.css']
})
export class SignupSigninComponent implements OnInit {


  //TODO: создание кошелька, проверка приглашений, и создание запроса - сделать через modal
  signUpForm: FormGroup;
  signInForm: FormGroup;
  isSignUp = true;
  isSignedIn = false;
 
  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
   ) { }

  ngOnInit(): void {
    console.log('reg start');
    this.signUpForm = new FormGroup({
      'usernameUp': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      'userpassUp': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8), Validators.pattern('([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])')]),
      'role': new FormControl('', Validators.required)
    });
    this.signInForm = new FormGroup({
      'usernameIn': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      'userpassIn': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)])
    });
  }

  onSignUp() {
    const username = this.signUpForm.value['usernameUp'];
    const password = this.signUpForm.value['userpassUp'];
    const role = this.signUpForm.value['role'];
    this.authService.register(username, password, role).subscribe((data: any) => {
      this.alertify.success(data.data);
      this.signUpForm.reset();
      this.signInForm.reset();
      this.isSignUp = false;
    }, error => {
      this.alertify.error(error.error);
      console.log(error.message);
    })
  }

  onSignIn() {
    const username = this.signInForm.value['usernameIn'];
    const password = this.signInForm.value['userpassIn'];
    this.authService.login(username, password).subscribe((data: any) => {
      this.alertify.success("Welcome: " + data.user['userName']);
      if (this.hasWallet()) {
        this.authService.hasWallet.next(true);
        this.router.navigate(['/wallet/home-wallet']);
      }
      else {
        console.log('I have no wallet');
        
        this.router.navigate(['/main/no-wallet']);
      }
    }, error => {
      this.alertify.error('Incorrect username or password');
    })
  }

  switchCard() {
    this.isSignUp = !this.isSignUp;
    this.signUpForm.reset();
    this.signInForm.reset();
  }

  hasWallet() {
    if (this.authService.getToken() !== null) {
      console.log(this.authService.getToken());
      if (this.authService.getToken().hasWallet === "true")
        return true;
      return false;
    }
    return false;
  }

 

  logout() {
    this.authService.logout();
  }

}
