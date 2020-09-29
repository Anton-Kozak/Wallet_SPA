import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

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
  signInLoading = false;
  signUpLoading = false;

  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private translateService: TranslateService,
    private titleService: Title
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
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(lang => {
      this.setTitle(lang['lang']);
    });

  }
  setTitle(lang: string) {
    if (lang === 'en') {
      this.titleService.setTitle('Start Now');
    }
    else if (lang === 'ru') {
      this.titleService.setTitle('Ввойдите или зарегестрируйтесь');
    }
  }

  onSignUp() {
    this.signUpLoading = true;
    const username = this.signUpForm.value['usernameUp'];
    const password = this.signUpForm.value['userpassUp'];
    const role = this.signUpForm.value['role'];
    this.authService.register(username, password, role).subscribe((data: any) => {
      this.alertify.success(data.data);
      this.signUpForm.reset();
      this.signInForm.reset();
      this.isSignUp = false;
      this.signUpLoading = false;
    }, error => {
      this.alertify.error(error.error);
      this.signUpLoading = false;
    })
  }

  onSignIn() {
    this.signInLoading = true;
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
      this.signInLoading = false;
    }, error => {
      this.alertify.error('Incorrect username or password');
      this.signInLoading = false;
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
