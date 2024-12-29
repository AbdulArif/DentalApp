import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadDownloadService {

  constructor(private http: HttpClient) { }

  uploadProfilePicture(formData: any, clinicId: string, userId: string): Observable<any> {
    const options = {
      params: new HttpParams()
        .append('clinicId', clinicId)
        .append('userId', userId)
    }
    return this.http.post<any>(`${environment.apiUrl}/api/Upload/UploadProfilePicture`, formData, options);
  }

  uploadclinicLogo(formData: any, clinicId: string, userId: string): Observable<any> {
    const options = {
      params: new HttpParams()
        .append('clinicId', clinicId)
        .append('userId', userId)
    }
    return this.http.post<any>(`${environment.apiUrl}/api/Upload/UploadclinicLogo`, formData, options);
  }

  getBinaryImage(clinicId: string, userId: string) {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('clinicId', clinicId)
        .append('userId', userId)
    }
    return this.http.get(`${environment.apiUrl}/api/Upload/GetBinaryImage`, options)
  }

  getBinaryclinicLogo(clinicId: string, userId: string) {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('clinicId', clinicId)
        .append('userId', userId)
    }
    return this.http.get(`${environment.apiUrl}/api/Upload/GetBinaryclinicLogo`, options)
  }

  UploadOrderFile(formData: any, clinicId: string, orderId: string, userId: string): Observable<any> {
    const options = {
      params: new HttpParams()
        .append('clinicId', clinicId)
        .append('orderId', orderId)
        .append('userId', userId)
    }
    return this.http.post<any>(`${environment.apiUrl}/api/Upload/UploadOrderFile`, formData, options);
  }

  getOrderFiles(clinicId: string, orderId: string) {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('clinicId', clinicId)
        .append('orderId', orderId)
    }
    return this.http.get(`${environment.apiUrl}/api/Upload/GetOrderFiles`, options)
  }

  DownloadOrderFile(Path_Blob: string, clinicId: string): Observable<any> {
    const options: Object = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('Path_Blob', Path_Blob)
        .append('clinicId', clinicId),
      responseType: 'blob',
      observe: 'response'
    }
    return this.http.get<any>(`${environment.apiUrl}/api/Upload/DownloadOrderFile`, options);
  }

  ViewOrderFile(Path_Blob: string, clinicId: string) {
    const options: Object = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('Path_Blob', Path_Blob)
        .append('clinicId', clinicId),
      responseType: 'blob',
      observe: 'response'
    }
    return this.http.get(`${environment.apiUrl}/api/Upload/ViewOrderFile`, options);
  }

}
