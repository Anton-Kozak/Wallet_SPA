import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css']
})
export class RequestAccessComponent implements OnInit {

  constructor(private reqService: RequestService, 
    private router: Router, 
    private alertify: AlertifyService,
    public dialogRef: MatDialogRef<RequestAccessComponent>) { }

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
    else{
      this.alertify.error("Email is too short!");
    }
  }

  back() {
    this.dialogRef.close();
  }

  test() {
    this.reqService.test().subscribe(response => {
      this.alertify.success(response)
    }, error => {
      this.alertify.error(error.error);
    });
  }

}
