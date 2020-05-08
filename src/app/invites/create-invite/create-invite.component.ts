import { Component, OnInit, Input } from '@angular/core';
import { InviteService } from 'src/app/_services/invite.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-invite',
  templateUrl: './create-invite.component.html',
  styleUrls: ['./create-invite.component.css']
})
export class CreateInviteComponent implements OnInit {

  constructor(private invService: InviteService, private alertify: AlertifyService, private router: Router) { }

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
    this.router.navigate(['/main']);
  }

}
