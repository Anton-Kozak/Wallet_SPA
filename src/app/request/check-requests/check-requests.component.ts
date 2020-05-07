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
  currentUser: any;
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.reqService.getRequests(this.currentUser.email, this.currentUser.id).subscribe((req: Request[]) => {
      this.requests = req;
      console.log(req);

    });
  }
  //TODO: обновлять таблицу при добавлении пользователя
  acceptRequest(email: string) {
    this.reqService.acceptRequest(email, this.currentUser.id).subscribe((response) => {
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
