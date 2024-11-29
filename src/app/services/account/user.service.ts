import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserBindingModel, UpdateUserBindingModel } from 'src/app/models/account/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  CreateUser(model: CreateUserBindingModel, UerRole: string): Observable<any> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('UerRole', UerRole)
    }
    return this.http.post<any>(`${environment.apiUrl}/api/Users/CreateUser`, model, options);
  }

  GetMyEmployees(clinicId: string, id: string, UerRole: string): Observable<any[]> {
    // console.log("clinicId:",clinicId)
    // console.log("userId:",id)
    // console.log("Role:",UerRole)
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ClinicId', clinicId)
        .append('Id', id)
        .append('UerRole', UerRole)
    }
    return this.http.get<any[]>(`${environment.apiUrl}/api/Users/GetMyEmployees`, options);
  }
  GetUser(UserId: string): Observable<any> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('UserId', UserId)
    }
    return this.http.get<any>(`${environment.apiUrl}/api/Users/GetUser`, options);
  }

  UpdateUser(model: UpdateUserBindingModel): Observable<any> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.put<any>(`${environment.apiUrl}/api/Users/UpdateUser`, model, options);
  }
}
