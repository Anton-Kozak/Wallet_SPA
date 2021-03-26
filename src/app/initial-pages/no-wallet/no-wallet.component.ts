import { Component, OnInit } from '@angular/core';
import { CreateWalletComponent } from 'src/app/wallet/create-wallet/create-wallet.component';
import { RequestAccessComponent } from 'src/app/request/request-access/request-access.component';
import { CheckInvitesComponent } from 'src/app/invites/check-invites/check-invites.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/_model/notification';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Language } from 'src/app/_helper/language';

@Component({
  selector: 'app-no-wallet',
  templateUrl: './no-wallet.component.html',
  styleUrls: ['./no-wallet.component.css']
})
export class NoWalletComponent implements OnInit {
  invites = 0;
  get isLengthOfInvitesNotNil(): boolean {
    return !!this.invites;
  }
  constructor(
    public dialog: MatDialog,
    private noteService: NotificationService,
    private authService: AuthService,
    private translateService: TranslateService,
    private titleService: Title,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.noteService.getNotifications().subscribe(
      (res: Notification[]) => {
        this.invites = res.length;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }
  setTitle(lang: string): void {
    if (lang === Language.English) {
      this.titleService.setTitle('Create Wallet');
    } else if (lang === Language.Russian) {
      this.titleService.setTitle('Создайте Кошелёк');
    }
  }

  onWalletCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateWalletComponent, {
      height: '95vh'
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/main/reg']);
      }
    });
  }

  onInvitesCheckDialog(): void {
    const dialogRef = this.dialog.open(CheckInvitesComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/main/reg']);
      }
    });
  }

  onRequestCreateDialog(): void {
    const dialogRef = this.dialog.open(RequestAccessComponent);
    dialogRef.afterClosed().subscribe();
  }
}
