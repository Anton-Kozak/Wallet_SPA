import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from '../_model/photo';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  //@Output() updateCurrentMainPhoto = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  response: string;
  currentMain: Photo;
  photo: Photo;
  baseUrl = environment.apiUrl;


  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.initialeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


  initialeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'photo/' + this.authService.getToken().nameid,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };


    this.uploader.onSuccessItem = (item, response, status, header) => {
      if (response) {
        //converts string into object
        const res: Photo = JSON.parse(response);
        //we building a photo object from the response from the server
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
        };
        this.photo = photo;
      }
    }
  }
  //TODO: сделать отдельный сервис для фото
  getPhoto() {
    this.authService.getPhoto().subscribe((data: Photo) => {
      this.photo = data;
    })
  }

  deletePhoto() {
    this.authService.deletePhoto().subscribe(() => {
      this.photo = null;
    })
  }

}
