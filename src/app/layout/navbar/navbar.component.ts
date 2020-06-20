import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { EditWalletComponent } from 'src/app/wallet/edit-wallet/edit-wallet.component';
import { NotificationService } from 'src/app/_services/notification.service';
import { Notification } from 'src/app/_model/notification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private noteService: NotificationService,) { }
  signInForm: FormGroup;
  currentUserName?: string;
  isLoggedIn = false;
  notificationCount: number = 0;
  notifications: Notification[] = [];

  @Output() toggleDrawer = new EventEmitter();
  toggleState = false;


  ngOnInit(): void {
    this.currentUserName = this.authService.getToken().unique_name;
    this.noteService.getNotifications().subscribe((notifications: Notification[]) => {
      if (notifications != null) {
        console.log("Notifications: " + notifications);
        this.notifications = notifications;
        this.notificationCount = notifications.length;
      }
    })

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/main']);
  }


  onToggle() {
    console.log('etmi test');
    this.toggleState = !this.toggleState;
    this.toggleDrawer.emit();
  }

  //TODO: сделать редактирование чисто для админа кошелька
  onWalletEditDialog() {
    const dialogRef = this.dialog.open(EditWalletComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  test() {
    this.noteService.deleteNotifications().subscribe();
  }

}
