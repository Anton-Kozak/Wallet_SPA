import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { Photo } from '../_model/photo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileData } from '../_model/data_models/profile-data';
import { WalletService } from '../_services/wallet.service';
import { UserForProfileEdit } from '../_model/user_models/user-for-profile-edit';
import { AlertifyService } from '../_services/alertify.service';
import { PhotoService } from '../_services/photo.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AuthService } from '../_services/auth.service';
import { Roles } from '../_helper/roles';
import { Language } from '../_helper/language';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // imagePath = '../../assets/images/default-avatar.png';
  photo: Photo = null;
  editProfileForm: FormGroup;
  profileData: ProfileData = null;
  userForEdit: UserForProfileEdit;
  isLoading: boolean;
  walletCurrency = 'USD';
  isBlocked: boolean;

  constructor(
    public dialog: MatDialog,
    private photoService: PhotoService,
    private walletService: WalletService,
    private alertify: AlertifyService,
    public translateService: TranslateService,
    private titleService: Title,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.getPhotoData();
    this.setCurrency();
    this.setLanguage();
    this.getStatus();
    this.walletService.getProfileData().subscribe(
      (profileData: ProfileData) => {
        this.profileData = profileData;
        //todo: сделать валидацию как и везде
        this.editProfileForm = new FormGroup({
          company: new FormControl(this.profileData.editUser.company, [
            Validators.minLength(2),
            Validators.maxLength(32),
            Validators.pattern('[A-Za-z0-9 .]+')
          ]),
          username: new FormControl(this.profileData.editUser.userName, [
            Validators.required,
            Validators.maxLength(16),
            Validators.pattern('[A-Za-z0-9]+')
          ]),
          email: new FormControl(this.profileData.editUser.email, [
            Validators.required,
            Validators.maxLength(32),
            Validators.email
          ]),
          firstName: new FormControl(this.profileData.editUser.firstName, [
            Validators.minLength(2),
            Validators.maxLength(16),
            Validators.pattern('[A-Za-z]+')
          ]),
          lastName: new FormControl(this.profileData.editUser.lastName, [
            Validators.minLength(2),
            Validators.maxLength(16),
            Validators.pattern('[A-Za-z]+')
          ]),
          address: new FormControl(this.profileData.editUser.address, [
            Validators.minLength(2),
            Validators.maxLength(32),
            Validators.pattern('[A-Za-z0-9 .]+')
          ]),
          phoneNumber: new FormControl(this.profileData.editUser.phoneNumber, [
            Validators.minLength(4),
            Validators.maxLength(16),
            Validators.pattern('[0-9]+')
          ]),
          city: new FormControl(this.profileData.editUser.city, [
            Validators.minLength(2),
            Validators.maxLength(32),
            Validators.pattern('[A-Za-z0-9]+')
          ]),
          country: new FormControl(this.profileData.editUser.country, [
            Validators.minLength(2),
            Validators.maxLength(32),
            Validators.pattern('[A-Za-z0-9 ]+')
          ])
        });
        this.isLoading = false;
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

  private getStatus() {
    this.isBlocked = this.authService.roleMatch(Roles.Blocked);
  }

  private setCurrency() {
    this.walletService.getCurrentWallet().subscribe(
      (wallet) => {
        this.walletCurrency = wallet['currency'];
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  private setLanguage() {
    if (this.translateService.currentLang === Language.English) {
      moment.locale(Language.English);
    } else if (this.translateService.currentLang === Language.Russian)
      moment.locale(Language.Russian);

    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === Language.English) {
        moment.locale(Language.English);
      } else if (this.translateService.currentLang === Language.Russian)
        moment.locale(Language.Russian);
    });

    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }

  setTitle(lang: string): void {
    if (lang === Language.English) {
      this.titleService.setTitle('Your Profile');
    } else if (lang === Language.Russian) {
      this.titleService.setTitle('Ваш Профиль');
    }
  }

  onImageChange(): void {
    const dialogRef = this.dialog.open(ImageModalComponent);
    dialogRef.afterClosed().subscribe(
      () => {
        //this.getPhoto();
        this.photoService.getPhoto();
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  // getPhoto(): void {
  //   this.photoService.getPhoto().subscribe((data: Photo) => {
  //     this.photo = data;
  //   });
  // }

  updateUrl(target: EventTarget): void {
    console.log('error img', target);
    (target as HTMLInputElement).src = '../../assets/images/default-avatar.png';
  }

  private checkIfChangesWereMade(): boolean {
    const initialUser = Object.values(this.editProfileForm.value).sort();
    const editedUser = Object.values(this.profileData.editUser).sort();
    const res = JSON.stringify(initialUser) !== JSON.stringify(editedUser);
    console.log(res);
    return res;
  }

  editProfile(): void {
    if (this.editProfileForm.valid && !this.isBlocked) {
      if (this.checkIfChangesWereMade()) {
        this.userForEdit = {
          address: this.editProfileForm.value['address'],
          company: this.editProfileForm.value['company'],
          firstName: this.editProfileForm.value['firstName'],
          lastName: this.editProfileForm.value['lastName'],
          userName: this.editProfileForm.value['username'],
          email: this.editProfileForm.value['email'],
          city: this.editProfileForm.value['city'],
          country: this.editProfileForm.value['country'],
          phoneNumber: this.editProfileForm.value['phoneNumber']
        };
        this.walletService.updateUserProfile(this.userForEdit).subscribe(
          (response: string) => {
            this.alertify.success(response);
            this.profileData.editUser.userName = this.editProfileForm.value[
              'username'
            ];
            this.profileData.editUser.firstName = this.editProfileForm.value[
              'firstName'
            ];
            this.profileData.editUser.lastName = this.editProfileForm.value[
              'lastName'
            ];
          },
          (error) => {
            this.alertify.error(error.statusText);
          }
        );
      } else {
        this.alertify.warning('You have not done any changes!');
      }
    }
  }

  getFormat(date: Date): string {
    return moment(date).format('lll');
  }

  //todo: проверка ошибки когда не получается найти картинку по ссылке
}
