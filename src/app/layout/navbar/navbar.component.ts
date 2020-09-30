import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditWalletComponent } from 'src/app/wallet/edit-wallet/edit-wallet.component';
import { NotificationService } from 'src/app/_services/notification.service';
import { Notification } from 'src/app/_model/notification';
import { MyThemeService } from 'src/app/_services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { Photo } from 'src/app/_model/photo';
import { PhotoService } from 'src/app/_services/photo.service';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private photoService: PhotoService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private noteService: NotificationService,
    private themeService: MyThemeService,
    public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    if (localStorage.getItem('language') !== null) {
      this.translate.use(localStorage.getItem('language'));
      this.activeLang = localStorage.getItem('language');
    }
    else {
      this.activeLang = translate.getBrowserLang();
      translate.use(this.activeLang.match(/en|ru/) ? this.activeLang : 'en');
    }
  }
  signInForm: FormGroup;
  currentUserName?: string;
  isLoggedIn = false;
  notificationCount: number = 0;
  notifications: Notification[] = [];
  theme = new FormControl(false);
  isDark: boolean;
  activeLang: string;
  photo: Photo = null;

  @Output() toggleDrawer = new EventEmitter();
  toggleState = false;


  ngOnInit(): void {

    this.themeService.currentTheme.subscribe(theme => {
      theme === 'dark' ? this.isDark = true : this.isDark = false;
    })
    console.log(this.isDark, this.themeService.currentTheme);
    this.getPhoto();
    this.currentUserName = this.authService.getToken().unique_name;
    this.noteService.getNotifications().subscribe((notifications: Notification[]) => {
      if (notifications != null) {
        console.log("Notifications: " + notifications);
        this.notifications = notifications;
        this.notificationCount = notifications.length;
      }
    })

    this.theme.valueChanges.subscribe(value => {
      if (value) {
        this.themeService.toggleDark();
      } else {
        this.themeService.toggleLight();
      }
    });
  }

  changeLang(lang: string) {
    localStorage.setItem('language', lang);
    this.translate.use(lang);
    this.activeLang = lang;
  }

  getPhoto() {
    this.photoService.getPhoto().subscribe((data: Photo) => {
      this.photo = data;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/main/home']);
  }


  onToggle() {
    console.log('etmi test');
    this.toggleState = !this.toggleState;
    this.toggleDrawer.emit();
  }



  test() {
    this.noteService.deleteNotifications().subscribe();
  }

  toggleTheme() {

  }

}
