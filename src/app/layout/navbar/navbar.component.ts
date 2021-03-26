import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_services/notification.service';
import { Notification } from 'src/app/_model/notification';
import { MyThemeService } from 'src/app/_services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { Photo } from 'src/app/_model/photo';
import { PhotoService } from 'src/app/_services/photo.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Roles } from 'src/app/_helper/roles';
import { Themes } from 'src/app/_helper/themes';
import { Language } from 'src/app/_helper/language';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private photoService: PhotoService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private noteService: NotificationService,
    private themeService: MyThemeService,
    public translate: TranslateService,
    private alertify: AlertifyService
  ) {
    translate.addLangs([Language.English, Language.Russian]);
    translate.setDefaultLang(Language.English);
    const LANGUAGE = localStorage.getItem('language');
    if (!!LANGUAGE) {
      this.translate.use(LANGUAGE);
      this.activeLang = LANGUAGE;
    } else {
      this.activeLang = translate.getBrowserLang();
      translate.use(
        this.activeLang.match(/en|ru/) ? this.activeLang : Language.English
      );
    }
  }
  signInForm: FormGroup;
  currentUserName?: string;
  isLoggedIn = false;
  notificationCount = 0;
  notifications: Notification[] = [];
  activeLang: string;
  activeTheme: string;
  photo: Photo = null;
  @Output() toggleDrawer = new EventEmitter();
  toggleState = false;
  isBlocked = false;

  isActiveTheme(theme: string): boolean {
    return this.activeTheme === theme;
  }

  get isEnglishActiveLanguage(): boolean {
    return this.activeLang === Language.English;
  }

  get isNotificationLengthNil(): boolean {
    return this.notifications.length === 0;
  }

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe((theme) => {
      this.activeTheme = theme;
    });
    this.getPhotoData();
    this.currentUserName = this.authService.getToken().unique_name;
    this.isBlocked = this.authService.roleMatch(Roles.Blocked);
    this.noteService.getNotifications().subscribe(
      (notifications: Notification[]) => {
        if (notifications != null) {
          this.notifications = notifications;
          this.notificationCount = notifications.length;
        }
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  private getPhotoData() {
    this.photoService.getCurrentPhotoSubject().subscribe((photo: Photo) => {
      this.photo = photo;
    });
    this.photoService.getPhoto();
  }

  changeLang(lang: string): void {
    localStorage.setItem('language', lang);
    this.translate.use(lang);
    this.activeLang = lang;
  }

  changeTheme(theme: string): void {
    switch (theme) {
      case Themes.Light:
        this.themeService.toggleLight();
        break;
      case Themes.Dark:
        this.themeService.toggleDark();
        break;
      case Themes.Blue:
        this.themeService.toggleBlue();
        break;
      default:
        this.themeService.toggleLight();
        break;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/main/home']);
  }

  updateUrl(target: EventTarget): void {
    (target as HTMLInputElement).src = '../../assets/images/default-avatar.png';
  }

  onToggle(): void {
    this.toggleState = !this.toggleState;
    this.toggleDrawer.emit();
  }

  checkNotifications(): void {
    this.noteService.deleteNotifications().subscribe(
      () => {
        this.notificationCount = 0;
        setTimeout(() => {
          this.notifications = [];
        }, 20000);
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }
}
