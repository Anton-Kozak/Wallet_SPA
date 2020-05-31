import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService) { }
  id: string;
  @Output() createExpense = new EventEmitter();

  @ViewChild('sidenav') sidenav: MatSidenav;
  ngOnInit(): void {
    this.id = this.authService.getToken().nameid;
  }
  close() {
    this.sidenav.close();
  }

  onCreate() {
    this.createExpense.emit("test");
  }



}
