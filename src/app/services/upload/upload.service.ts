import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient
  ) { }

  singleUpload(file: File): Observable<HttpEvent<ApiType.UploadApkResType>>
  {
    const formData = new FormData()
    formData.append('file', file)
    const res = this.http.post(`${environment.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }) as Observable<HttpProgressEvent>
    return res
  }
}
