import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      'userpass': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)])
    })
  }

  onSubmit() {
    const username = this.signUpForm.value['username'];
    const password = this.signUpForm.value['userpass']
    this.authService.register(username, password).subscribe((data: any) => {
      this.alertify.success(data.data);
    }, error=>{
      this.alertify.error(error.statusText);
    })
  }

}
