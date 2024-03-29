import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Language } from 'src/app/_helper/language';
import { Roles } from 'src/app/_helper/roles';
import {
  allNumbersAndLettersAndOther,
  justLetters,
  justNumbers,
  lettersAndSpaces
} from 'src/app/_helper/validationPatterns';
import { ProfileData } from 'src/app/_model/data_models/profile-data';
import { Photo } from 'src/app/_model/photo';
import { UserForProfileEdit } from 'src/app/_model/user_models/user-for-profile-edit';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { PhotoService } from 'src/app/_services/photo.service';
import { WalletService } from 'src/app/_services/wallet.service';

const validationPattern = '[A-Za-z0-9]+';

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
    this.setCurrency();
    this.setLanguage();
    this.getPhotoData(this.data.id);
    this.isBlocked = this.data.userRoles.includes(Roles.Blocked);
    this.userRoles = [...this.data.userRoles];
    this.adminService.getProfileData(this.data.id).subscribe(
      (profileData: ProfileData) => {
        this.profileData = profileData;
        this.editFormInitialization();
        this.isLoading = false;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  private editFormInitialization() {
    this.editProfileForm = new FormGroup({
      company: new FormControl(this.profileData.editUser.company, [
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.pattern(allNumbersAndLettersAndOther)
      ]),
      username: new FormControl(this.profileData.editUser.userName, [
        Validators.required,
        Validators.maxLength(16),
        Validators.pattern(validationPattern)
      ]),
      email: new FormControl(this.profileData.editUser.email, [
        Validators.required,
        Validators.maxLength(32),
        Validators.email
      ]),
      firstName: new FormControl(this.profileData.editUser.firstName, [
        Validators.minLength(2),
        Validators.maxLength(16),
        Validators.pattern(justLetters)
      ]),
      lastName: new FormControl(this.profileData.editUser.lastName, [
        Validators.minLength(2),
        Validators.maxLength(16),
        Validators.pattern(justLetters)
      ]),
      address: new FormControl(this.profileData.editUser.address, [
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.pattern(allNumbersAndLettersAndOther)
      ]),
      phoneNumber: new FormControl(this.profileData.editUser.phoneNumber, [
        Validators.minLength(4),
        Validators.maxLength(16),
        Validators.pattern(justNumbers)
      ]),
      city: new FormControl(this.profileData.editUser.city, [
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.pattern(validationPattern)
      ]),
      country: new FormControl(this.profileData.editUser.country, [
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.pattern(lettersAndSpaces)
      ])
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
    this.walletService.getCurrentWallet().subscribe(
      (wallet) => {
        this.walletCurrency = wallet.currency;
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

  private checkIfChangesWereMade(): boolean {
    const initialUser = Object.values(this.editProfileForm.value).sort();
    const editedUser = Object.values(this.profileData.editUser).sort();
    const res = JSON.stringify(initialUser) !== JSON.stringify(editedUser);
    console.log(res);
    return res;
  }

  editProfile(): void {
    if (this.editProfileForm.valid) {
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
