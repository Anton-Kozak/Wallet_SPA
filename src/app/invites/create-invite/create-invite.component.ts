import { Component, OnInit, Input } from '@angular/core';
import { InviteService } from 'src/app/_services/invite.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-invite',
  templateUrl: './create-invite.component.html',
  styleUrls: ['./create-invite.component.css']
})
export class CreateInviteComponent implements OnInit {

  constructor(private invService: InviteService, 
    private alertify: AlertifyService, 
    public dialogRef: MatDialogRef<CreateInviteComponent>) { }

  @Input() email: string = "";

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.email.length >= 4) {
      this.invService.createInvite(this.email).subscribe((response: any) => {
        this.alertify.success(response);
        console.log(response);
      }, error => {
        this.alertify.error(error.error)
      });
    }
    else{
      this.alertify.error("Email is too short!");
    }
  }

  goBack() {
    this.dialogRef.close();
  }

}
