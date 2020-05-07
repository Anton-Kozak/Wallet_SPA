import { Component, OnInit } from '@angular/core';
import { InviteService } from 'src/app/_services/invite.service';
import { Invite } from 'src/app/_model/invite';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-check-invites',
  templateUrl: './check-invites.component.html',
  styleUrls: ['./check-invites.component.css']
})
export class CheckInvitesComponent implements OnInit {

  constructor(private invService: InviteService, private alertify: AlertifyService) { }
  invites: Invite[];

  ngOnInit(): void {
    this.invService.checkInvites().subscribe((inv: Invite[]) => {
      this.invites = inv;
      console.log(this.invites);
    })
  }

  acceptInvite(walletId: number) {
    this.invService.accept(walletId).subscribe(response => {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      user.walletID = walletId;
      const userStr = JSON.stringify(user);
      localStorage.setItem('currentUser', userStr);
      this.alertify.success(response);
    }, error => {
      this.alertify.error(error.error);
    });
  }

  declineInvite(walletId: number) {
    this.invService.decline(walletId).subscribe(response => {
      this.alertify.success(response);
    }, error => {
      this.alertify.error(error.error);
    })
  }

}
