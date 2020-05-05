import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-request-invite',
  templateUrl: './request-invite.component.html',
  styleUrls: ['./request-invite.component.css']
})
export class RequestInviteComponent implements OnInit {

  constructor(private reqService: RequestService, private router: Router, private alertify: AlertifyService) { }

  @Input() email: string = "";

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.email.length >= 4) {
      this.reqService.createInviteRequest(this.email).subscribe((response: string) => {
        this.alertify.success(response);
      }, error => {
        this.alertify.error(error.statusText)
      }
      )
    }
  }

  goBack(){
    this.router.navigate(['/main']);
  }

}
