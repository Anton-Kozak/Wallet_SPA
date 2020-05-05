import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-request-invite',
  templateUrl: './request-invite.component.html',
  styleUrls: ['./request-invite.component.css']
})
export class RequestInviteComponent implements OnInit {

  constructor(private reqService: RequestService, private router: Router) { }

  @Input() email: string = "";

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.email.length >= 4) {
      this.reqService.createInviteRequest(this.email).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      }
      )
    }
  }

  goBack(){
    this.router.navigate(['/main']);
  }

}
