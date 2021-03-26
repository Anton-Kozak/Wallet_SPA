import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserAfterRegistration } from 'src/app/_model/user_models/userAfterRegistration';
import { ApplicationUser } from 'src/app/_model/user_models/applicationUser';
import { Roles } from 'src/app/_helper/roles';
import { Language } from 'src/app/_helper/language';

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
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private translateService: TranslateService,
    private titleService: Title,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        usernameUp: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
          Validators.pattern('[a-zA-Z0-9]+')
        ]),
        userpassUp: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
          Validators.pattern('([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])')
        ]),
        userRepeatPassUp: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
          Validators.pattern('([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])')
        ])
      },
      { validator: this.MustMatch('userpassUp', 'userRepeatPassUp') }
    );
    this.signInForm = new FormGroup({
      usernameIn: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        Validators.pattern('[a-zA-Z0-9]+')
      ]),
      userpassIn: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
        Validators.pattern('([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])')
      ])
    });
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.value.length > 3 && control.value.length > 3) {
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      }
    };
  }
  setTitle(lang: string): void {
    if (lang === Language.English) {
      this.titleService.setTitle('Start Now');
    } else if (lang === Language.Russian) {
      this.titleService.setTitle('Ввойдите или зарегестрируйтесь');
    }
  }

  onSignUp(): void {
    this.signUpLoading = true;
    const username = this.signUpForm.value['usernameUp'];
    const password = this.signUpForm.value['userpassUp'];
    const role = Roles.Adult;

    this.authService.register(username, password, role).subscribe(
      (data: { data: string; user: UserAfterRegistration }) => {
        this.alertify.success(data.data);
        this.resetSignUpForm();
        this.resetSignInForm();
        this.isSignUp = false;
        this.signUpLoading = false;
      },
      (error) => {
        this.alertify.error(error);
        this.signUpLoading = false;
      }
    );
  }

  onSignIn(): void {
    this.signInLoading = true;
    const username = this.signInForm.value['usernameIn'];
    const password = this.signInForm.value['userpassIn'];
    this.authService.login(username, password).subscribe(
      (data: { token: string; user: ApplicationUser }) => {
        this.alertify.success('Welcome: ' + data.user.firstName);
        if (this.hasWallet()) {
          this.authService.hasWallet.next(true);
          this.router.navigate(['/wallet/home-wallet']);
        } else {
          this.router.navigate(['/main/no-wallet']);
        }
        this.signInLoading = false;
      },
      (error) => {
        this.alertify.error(error);
        this.signInLoading = false;
      }
    );
  }

  resetSignUpForm(): void {
    this.signUpForm.reset({
      userpassIn: [],
      usernameUp: [],
      userRepeatPassUp: [],
      validator: this.MustMatch('userpassUp', 'userRepeatPassUp')
    });
  }
  resetSignInForm(): void {
    this.signInForm.reset({
      usernameIn: [],
      userpassIn: []
    });
  }

  switchCard(): void {
    if (this.isSignUp) {
      this.resetSignUpForm();
    } else {
      this.resetSignInForm();
    }
    this.isSignUp = !this.isSignUp;
  }

  hasWallet(): boolean {
    if (this.authService.getToken() !== null) {
      if (this.authService.getToken().hasWallet === 'true') return true;
      return false;
    }
    return false;
  }

  logout(): void {
    this.authService.logout();
  }
}
