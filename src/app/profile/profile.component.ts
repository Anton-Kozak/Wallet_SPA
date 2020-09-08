import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { Photo } from '../_model/photo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileData } from '../_model/profile-data';
import { WalletService } from '../_services/wallet.service';
import { UserForProfileEdit } from '../_model/user-for-profile-edit';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  imagePath = '../../assets/images/default-avatar.png';
  photo: Photo = null;
  editProfileForm: FormGroup;
  profileData: ProfileData = null;
  userForEdit: UserForProfileEdit;
  isLoading: boolean;
  constructor(public dialog: MatDialog, private authService: AuthService, private walletService: WalletService, private alertify: AlertifyService) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.walletService.getProfileData().subscribe((profileData: ProfileData) => {
      this.profileData = profileData;
      console.log('Profile', profileData);
      //todo: сделать валидацию как и везде
      this.editProfileForm = new FormGroup({
        'company': new FormControl(this.profileData.editUser.company, [Validators.minLength(2), Validators.maxLength(32), Validators.pattern("[A-Za-z0-9 \.]+")]),
        'username': new FormControl(this.profileData.editUser.userName, [Validators.required, Validators.maxLength(16), Validators.pattern("[A-Za-z0-9]+")]),
        'email': new FormControl(this.profileData.editUser.email, [Validators.required, Validators.maxLength(32), Validators.email]),
        'firstName': new FormControl(this.profileData.editUser.firstName, [Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Za-z]+")]),
        'lastName': new FormControl(this.profileData.editUser.lastName, [Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Za-z]+")]),
        'address': new FormControl(this.profileData.editUser.address, [Validators.minLength(2), Validators.maxLength(32), Validators.pattern("[A-Za-z0-9 \.]+")]),
        'phoneNumber': new FormControl(this.profileData.editUser.phoneNumber, [Validators.minLength(4), Validators.maxLength(16), Validators.pattern("[0-9]+")]),
        'city': new FormControl(this.profileData.editUser.city, [Validators.minLength(2), Validators.maxLength(32), Validators.pattern("[A-Za-z0-9]+")]),
        'country': new FormControl(this.profileData.editUser.country, [Validators.minLength(2), Validators.maxLength(32), Validators.pattern("[A-Za-z0-9 ]+")]),
      });
      this.isLoading = false;
    })

    this.getPhoto();
  }

  onImageChange() {
    const dialogRef = this.dialog.open(ImageModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getPhoto();
    });
  }

  getPhoto() {
    this.authService.getPhoto().subscribe((data: Photo) => {
      this.photo = data;
    })
  }

  editProfile() {
    if (this.editProfileForm.valid) {
      this.userForEdit = {
        address: this.editProfileForm.value['address'],
        company: this.editProfileForm.value['company'],
        firstName: this.editProfileForm.value['firstName'],
        lastName: this.editProfileForm.value['lastName'],
        userName: this.editProfileForm.value['username'],
        email: this.editProfileForm.value['email'],
        city: this.editProfileForm.value['city'],
        country: this.editProfileForm.value['country'],
        phoneNumber: this.editProfileForm.value['phoneNumber'],
      }
      this.walletService.updateUserProfile(this.userForEdit).subscribe((response: string) => {
        this.alertify.success(response);
      });
    }
  }


}
