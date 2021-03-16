import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { PhotoService } from 'src/app/_services/photo.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {
  photo: File = null;
  isUploaded = false;
  url;
  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    private photoService: PhotoService
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onFileChanged(event): void {
    this.photo = event.target.files[0];

    const reader = new FileReader();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.onerror = (event: any) => {
      console.log('File could not be read: ' + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  uploadPhoto(): void {
    const uploadData = new FormData();
    uploadData.append('Name', this.photo.name);
    uploadData.append('File', this.photo);
    this.photoService.addPhoto(uploadData).subscribe(() => {
      this.isUploaded = true;
      this.dialogRef.close();
    });
  }

  back(): void {
    this.dialogRef.close();
  }
}
