import { Component, Input } from '@angular/core';
import { InviteService } from 'src/app/_services/invite.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-invite',
  templateUrl: './create-invite.component.html',
  styleUrls: ['./create-invite.component.css']
})
export class CreateInviteComponent {
  constructor(
    private invService: InviteService,
    private alertify: AlertifyService,
    public dialogRef: MatDialogRef<CreateInviteComponent>
  ) {}

  @Input() email = '';

  onSubmit(): void {
    if (this.email.length >= 4) {
      this.invService.createInvite(this.email).subscribe(
        (response: string) => {
          this.alertify.success(response);
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
    } else {
      this.alertify.error('Email is too short!');
    }
  }

  goBack(): void {
    this.dialogRef.close();
  }
}
