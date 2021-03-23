import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ProfileData } from 'src/app/_model/data_models/profile-data';
import { Photo } from 'src/app/_model/photo';
import { UserForProfileEdit } from 'src/app/_model/user_models/user-for-profile-edit';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { PhotoService } from 'src/app/_services/photo.service';
import { WalletService } from 'src/app/_services/wallet.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  photo: Photo = null;
  editProfileForm: FormGroup;
  profileData: ProfileData = null;
  userForEdit: UserForProfileEdit;
  userRoles: string[] = [];
  isLoading: boolean;
  walletCurrency = 'USD';
  isBlocked: boolean;
  constructor(
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any,
    private walletService: WalletService,
    private adminService: AdminService,
    private alertify: AlertifyService,
    public translateService: TranslateService,
    private titleService: Title,
    private authService: AuthService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    // this.getPhotoData();
    this.setCurrency();
    this.setLanguage();
    this.getPhotoData(this.data.id);
    this.isBlocked = this.data.userRoles.includes('Blocked');
    this.userRoles = [...this.data.userRoles];
    this.adminService
      .getProfileData(this.data.id)
      .subscribe((profileData: ProfileData) => {
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
      });
  }

  private getPhotoData(userToEditId: string) {
    this.photoService
      .getPhotoAsAdmin(userToEditId)
      .subscribe((photo: Photo) => {
        this.photo = photo;
      });
  }

  private setCurrency() {
    this.walletService.getCurrentWallet().subscribe((wallet) => {
      this.walletCurrency = wallet['currency'];
    });
  }

  private setLanguage() {
    if (this.translateService.currentLang === 'en') {
      moment.locale('en');
    } else if (this.translateService.currentLang === 'ru') moment.locale('ru');

    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === 'en') {
        moment.locale('en');
      } else if (this.translateService.currentLang === 'ru')
        moment.locale('ru');
    });

    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }

  setTitle(lang: string): void {
    if (lang === 'en') {
      this.titleService.setTitle('Your Profile');
    } else if (lang === 'ru') {
      this.titleService.setTitle('Ваш Профиль');
    }
  }
  //todo: просто сделать удаление или подумать о диалоге в диалоге
  onImageChange(): void {
    // const dialogRef = this.dialog.open(ImageModalComponent);
    // dialogRef.afterClosed().subscribe(() => {
    //   //this.getPhoto();
    //   this.photoService.getPhoto();
    // });
  }

  updateUrl(target: EventTarget): void {
    console.log('error img', target);
    (target as HTMLInputElement).src = '../../assets/images/default-avatar.png';
  }

  editProfile(): void {
    if (this.editProfileForm.valid) {
      if (
        this.editProfileForm.value['address'] !==
          this.profileData.editUser.address ||
        this.editProfileForm.value['company'] !==
          this.profileData.editUser.company ||
        this.editProfileForm.value['firstName'] !==
          this.profileData.editUser.firstName ||
        this.editProfileForm.value['firstName'] !==
          this.profileData.editUser.firstName ||
        this.editProfileForm.value['lastName'] !==
          this.profileData.editUser.lastName ||
        this.editProfileForm.value['username'] !==
          this.profileData.editUser.userName ||
        this.editProfileForm.value['email'] !==
          this.profileData.editUser.email ||
        this.editProfileForm.value['city'] !== this.profileData.editUser.city ||
        this.editProfileForm.value['country'] !==
          this.profileData.editUser.country ||
        this.editProfileForm.value['phoneNumber'] !==
          this.profileData.editUser.phoneNumber
      ) {
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
        this.adminService
          .updateUserProfile(this.userForEdit, this.data.id)
          .subscribe(
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
}
