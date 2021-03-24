import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Request } from 'src/app/_model/request';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-check-requests',
  templateUrl: './check-requests.component.html',
  styleUrls: ['./check-requests.component.css']
})
export class CheckRequestsComponent implements OnInit {
  constructor(
    private reqService: RequestService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  @Output() onUserAdd = new EventEmitter();

  columns: string[] = ['from', 'date', 'actions'];
  requests = new MatTableDataSource<Request>();

  get requestLength(): boolean {
    return this.requests.data.length > 0;
  }
  ngOnInit(): void {
    this.reqService
      .getRequests(this.authService.getToken().nameid)
      .subscribe((req: Request[]) => {
        this.requests.data = req;
        if (this.requests.data.length == 0)
          this.alertify.error('You have no new requests');
      });
  }
  //TODO: обновлять таблицу при добавлении пользователя
  acceptRequest(email: string, rowIndex: number): void {
    this.reqService
      .acceptRequest(email, this.authService.getToken().nameid)
      .subscribe(
        (response) => {
          this.requests.data.splice(rowIndex, 1);
          this.requests.data = this.requests.data;
          this.alertify.success(response);
          this.onUserAdd.emit();
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
  }

  declineRequest(email: string, rowIndex: number): void {
    this.reqService.declineRequest(email).subscribe(
      (response) => {
        this.requests.data.splice(rowIndex, 1);
        this.requests.data = this.requests.data;
        this.alertify.success(response);
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }
}
