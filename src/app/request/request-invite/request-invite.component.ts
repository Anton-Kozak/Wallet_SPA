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
      this.reqService.createRequestForAccess(this.email).subscribe((response: any) => {
        this.alertify.success(response);
        console.log(response);
      }, error => {
        this.alertify.error(error.error)
      });
    }
  }

  goBack() {
    this.router.navigate(['/main']);
  }

  test() {
    this.reqService.test().subscribe(response => {
      this.alertify.success(response)
    }, error => {
      this.alertify.error(error.error);
    });
  }

}
