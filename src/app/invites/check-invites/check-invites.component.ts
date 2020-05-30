import { Component, OnInit } from '@angular/core';
import { InviteService } from 'src/app/_services/invite.service';
import { Invite } from 'src/app/_model/invite';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-invites',
  templateUrl: './check-invites.component.html',
  styleUrls: ['./check-invites.component.css']
})
export class CheckInvitesComponent implements OnInit {

  constructor(private invService: InviteService, private alertify: AlertifyService, private router: Router) { }
  invites: Invite[];

  ngOnInit(): void {
    this.invService.checkInvites().subscribe((inv: Invite[]) => {
      this.invites = inv;
      console.log(this.invites);
    })
  }

  acceptInvite(walletId: number) {
    this.invService.accept(walletId).subscribe(response => {
      this.alertify.success(response);
      this.alertify.success("Please, log in to see your wallet");
      this.router.navigate(['/home']);
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
