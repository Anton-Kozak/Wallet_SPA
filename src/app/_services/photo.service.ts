import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl: string = environment.apiUrl + "photo/";
  constructor(private http: HttpClient, private authService: AuthService) { }

  getPhoto() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid);
  }

  addPhoto(photo: any) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid, photo);
  }

  deletePhoto() {
    return this.http.delete(this.baseUrl + this.authService.getToken().nameid);
  }

  getAllUserPhotos() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getUserPhotos')
  }
}
