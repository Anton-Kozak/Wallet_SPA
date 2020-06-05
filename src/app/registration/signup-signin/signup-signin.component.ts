import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateWalletComponent } from 'src/app/wallet/create-wallet/create-wallet.component';
import { RequestAccessComponent } from 'src/app/request/request-access/request-access.component';
import { CheckInvitesComponent } from 'src/app/invites/check-invites/check-invites.component';
import { Router, ActivatedRoute } from '@angular/router';

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
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'usernameUp': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      'userpassUp': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      'role': new FormControl('', Validators.required)
    });
    this.signInForm = new FormGroup({
      'usernameIn': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      'userpassIn': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)])
    });
    this.isSignedIn = localStorage.getItem('token') !== null ? true : false;
  }

  onSignUp() {
    const username = this.signUpForm.value['usernameUp'];
    const password = this.signUpForm.value['userpassUp'];
    const role = this.signUpForm.value['role'];
    this.authService.register(username, password, role).subscribe((data: any) => {
      this.alertify.success(data.data);
      this.isSignUp = false;
    }, error => {
      this.alertify.error(error.error);
    })
  }

  onSignIn() {
    const username = this.signInForm.value['usernameIn'];
    const password = this.signInForm.value['userpassIn'];
    this.authService.login(username, password).subscribe((data: any) => {
      this.alertify.success("Welcome: " + data.user['userName']);
      this.router.navigate(['/wallet/home'])
      // if (this.hasWallet()) {
      //   this.authService.hasWallet.next(true);
      // }
      // else {
      //   this.isSignedIn = true;
      //   console.log(this.isSignedIn);
      // }
    }, error => {
      this.alertify.error(error.error);
    })
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
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onInvitesCheckDialog() {
    const dialogRef = this.dialog.open(CheckInvitesComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onRequestCreateDialog() {
    const dialogRef = this.dialog.open(RequestAccessComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
