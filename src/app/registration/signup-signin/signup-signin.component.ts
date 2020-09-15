import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateWalletComponent } from 'src/app/wallet/create-wallet/create-wallet.component';
import { RequestAccessComponent } from 'src/app/request/request-access/request-access.component';
import { CheckInvitesComponent } from 'src/app/invites/check-invites/check-invites.component';
import { Router } from '@angular/router';
import { Notification } from 'src/app/_model/notification';
import { NotificationService } from 'src/app/_services/notification.service';

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
  invites: number = 0;
  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    public dialog: MatDialog,
    private router: Router,
    private noteService: NotificationService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'usernameUp': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern('([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])')]),
      'userpassUp': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8), Validators.pattern('([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])')]),
      'role': new FormControl('', Validators.required)
    });
    this.signInForm = new FormGroup({
      'usernameIn': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      'userpassIn': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)])
    });
    this.authService.isLoggedIn.subscribe(res => {
      this.isSignedIn = res;
    })
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
        this.router.navigate(['/wallet/home']);
      }
      else {
        this.isSignedIn = true;
        this.noteService.getNotifications().subscribe((res: Notification[]) => {
          this.invites = res.length;
        })
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

  onWalletCreateDialog() {
    const dialogRef = this.dialog.open(CreateWalletComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.logout();
    });
  }

  onInvitesCheckDialog() {
    const dialogRef = this.dialog.open(CheckInvitesComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.logout();
    });
  }

  onRequestCreateDialog() {
    const dialogRef = this.dialog.open(RequestAccessComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout() {
    this.authService.logout();
  }


}
