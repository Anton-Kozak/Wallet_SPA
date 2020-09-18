import { Component, OnInit } from '@angular/core';
import { CreateWalletComponent } from 'src/app/wallet/create-wallet/create-wallet.component';
import { RequestAccessComponent } from 'src/app/request/request-access/request-access.component';
import { CheckInvitesComponent } from 'src/app/invites/check-invites/check-invites.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-no-wallet',
  templateUrl: './no-wallet.component.html',
  styleUrls: ['./no-wallet.component.css']
})
export class NoWalletComponent implements OnInit {
  invites: number = 0;
  constructor(public dialog: MatDialog, private noteService: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.noteService.getNotifications().subscribe((res: Notification[]) => {
      this.invites = res.length;
    });
  }


  onWalletCreateDialog() {
    const dialogRef = this.dialog.open(CreateWalletComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.authService.logout();
    });
  }

  onInvitesCheckDialog() {
    const dialogRef = this.dialog.open(CheckInvitesComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.authService.logout();
    });
  }

  onRequestCreateDialog() {
    const dialogRef = this.dialog.open(RequestAccessComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
