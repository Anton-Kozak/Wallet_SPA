import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Photo } from '../_model/photo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl: string = environment.apiUrl + 'photo/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  private currentPhotoSubject = new BehaviorSubject<Photo>(null);

  getCurrentPhotoSubject(): Observable<Photo> {
    return this.currentPhotoSubject.asObservable();
  }

  getPhoto(): void {
    this.http
      .get<Photo>(`${this.baseUrl}${this.authService.getToken().nameid}`)
      .pipe(
        map((photo: Photo) => {
          this.currentPhotoSubject.next(photo);
        })
      )
      .subscribe();
  }

  addPhoto(photo: Photo | unknown): Observable<Photo> {
    return this.http.post<Photo>(
      `${this.baseUrl}${this.authService.getToken().nameid}`,
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
      `${this.baseUrl}${this.authService.getToken().nameid}/getUserPhotos`
    );
  }
}
