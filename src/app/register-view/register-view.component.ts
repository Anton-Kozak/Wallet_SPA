import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  registerMode = false;

  ngOnInit(): void {
    //TODO: запретить заходить сюда если уже залогиненный
    if(this.authService.checkLogin())
      this.router.navigate(['main']);
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

}
