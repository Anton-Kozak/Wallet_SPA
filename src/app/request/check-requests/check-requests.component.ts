import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Request } from 'src/app/_model/request';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-check-requests',
  templateUrl: './check-requests.component.html',
  styleUrls: ['./check-requests.component.css']
})
export class CheckRequestsComponent implements OnInit {


  constructor(private reqService: RequestService, private authService: AuthService, private alertify: AlertifyService) { }
  requests: Request[] = [];
  ngOnInit(): void {
    this.reqService.getRequests(this.authService.getToken().nameid).subscribe((req: Request[]) => {
      this.requests = req;
      if(this.requests.length == 0)
      this.alertify.error("You have no new requests");
    });
  }
  //TODO: обновлять таблицу при добавлении пользователя
  acceptRequest(email: string) {
    this.reqService.acceptRequest(email, this.authService.getToken().nameid).subscribe((response) => {
      this.alertify.success(response)
    }, error => {
      this.alertify.error(error.error);
    });
  }

  declineRequest(email: string) {
    this.reqService.declineRequest(email).subscribe((response) => {
      this.alertify.success(response)
    }, error => {
      this.alertify.error(error.error);
    });
  }

}
