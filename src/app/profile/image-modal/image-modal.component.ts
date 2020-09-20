import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { PhotoService } from 'src/app/_services/photo.service';



@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  photo: File = null;
  isUploaded = false;
  url;
  constructor(public dialogRef: MatDialogRef<ImageModalComponent>,
    private photoService: PhotoService,) { }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    console.log('selected');

    this.photo = event.target.files[0];
    console.log(this.photo);

    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.url = event.target.result;
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);

  }

  uploadPhoto() {
    const uploadData = new FormData();
    uploadData.append('Name', this.photo.name);
    uploadData.append('File', this.photo);
    this.photoService.addPhoto(uploadData).subscribe(response => {
      console.log(response);
      this.isUploaded = true;
      this.dialogRef.close();
    });
  }

  back(){
    this.dialogRef.close();
  }

}
