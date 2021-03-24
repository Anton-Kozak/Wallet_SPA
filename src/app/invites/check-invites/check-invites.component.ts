import { Component, OnInit } from '@angular/core';
import { InviteService } from 'src/app/_services/invite.service';
import { Invite } from 'src/app/_model/invite';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-check-invites',
  templateUrl: './check-invites.component.html',
  styleUrls: ['./check-invites.component.css']
})
export class CheckInvitesComponent implements OnInit {
  constructor(
    private invService: InviteService,
    private alertify: AlertifyService,
    public dialogRef: MatDialogRef<CheckInvitesComponent>,
    private translateService: TranslateService
  ) {}
  invites: Invite[];

  ngOnInit(): void {
    if (this.translateService.currentLang === 'en') {
      moment.locale('en');
    } else if (this.translateService.currentLang === 'ru') moment.locale('ru');

    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === 'en') {
        moment.locale('en');
      } else if (this.translateService.currentLang === 'ru')
        moment.locale('ru');
    });
    this.invService.checkInvites().subscribe(
      (inv: Invite[]) => {
        this.invites = inv;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  acceptInvite(walletId: number): void {
    this.invService.accept(walletId).subscribe(
      (response) => {
        this.alertify.success(response);
        this.alertify.success('Please, log in to see your wallet');
        this.dialogRef.close(true);
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  declineInvite(walletId: number): void {
    this.invService.decline(walletId).subscribe(
      (response) => {
        this.alertify.success(response);
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  back(): void {
    this.dialogRef.close(false);
  }

  getFormat(date: string): string {
    return moment(date).format('lll');
  }
}
