import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../_model/photo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl: string = environment.apiUrl + 'photo/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getPhoto(): Observable<Photo> {
    return this.http.get<Photo>(
      this.baseUrl + this.authService.getToken().nameid
    );
  }

  addPhoto(photo: Photo | unknown): Observable<Photo> {
    return this.http.post<Photo>(
      this.baseUrl + this.authService.getToken().nameid,
      photo
    );
  }

  deletePhoto(): Observable<void | string> {
    return this.http.delete<void | string>(
      `${this.baseUrl}${this.authService.getToken().nameid}`
    );
  }

  getAllUserPhotos(): Observable<void> {
    return this.http.get<void>(
      `${this.baseUrl}${this.authService.getToken().nameid}'/getUserPhotos'`
    );
  }
}
