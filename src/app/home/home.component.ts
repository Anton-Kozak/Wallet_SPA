import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../_services/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private noteService: NotificationService) { }
  isAuthorized = false;
  notifications
  //hasWallet = false;
  //TODO: имя пользователя показывать при логине
  userName: string;
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(result => {
      this.isAuthorized = result;
      console.log("Is authorized: " + this.isAuthorized);
      if (this.isAuthorized) {
        console.log('Trying to get notifications');
        
        this.noteService.getNotifications().subscribe((notifications: Notification[]) => {
          this.notifications = notifications;
          this.notifications.forEach(element => {
            console.log(element.message);
          });
        })
      }
    });
  }

  hasWallet() {
    if (this.authService.getToken() !== null) {
      if (this.authService.getToken().hasWallet === "true")
        return true;
      return false;
    }
    return false;
  }

  goToRegistration() {
    this.router.navigate(['/register']);
  }

  goToWallet() {
    this.router.navigate(['/main']);
  }

  goToWalletCreation() {
    this.router.navigate(['/createNewWallet']);
  }

  requestWalletAccess() {
    this.router.navigate(['requestAccess']);
  }

  checkInvites() {
    this.router.navigate(['checkInvites']);
  }

}
