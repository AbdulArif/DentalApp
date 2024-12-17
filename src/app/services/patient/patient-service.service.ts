import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePatientModel } from 'src/app/models/patient/patient.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  GetPatients(clinicId: string, userId: string): Observable<any[]> {
    // console.log("clinicId:",clinicId)
    // console.log("userId:",id)
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ClinicId', clinicId)
        .append('UserId', userId)
    }
    return this.http.get<any[]>(`${environment.apiUrl}/api/Patient/GetPatients`, options);
  }
  CreatePatient(model: CreatePatientModel): Observable<any> {
      const options = {
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
        params: new HttpParams()
      }
      return this.http.post<any>(`${environment.apiUrl}/api/Patient/CreatePatient`, model, options);
    }
}
