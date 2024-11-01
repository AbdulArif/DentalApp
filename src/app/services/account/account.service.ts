import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordBindingModel, ForgotPasswordBindingModel, RegisterBindingModel, ResetPasswordBindingModel, Role } from 'src/app/models/account/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  Register(model: RegisterBindingModel): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Account/Register`, model);
  }

  GetRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.apiUrl}/api/Account/GetRoles`);
  }

  ChangePassword(model: ChangePasswordBindingModel): Observable<any> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.post<any>(`${environment.apiUrl}/api/Account/ChangePassword`, model, options);
  }

  ConfirmEmail(userId: string, code: string) {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams().append('userId', userId).append('code', code.replace(/ /g, "+"))
    }
    return this.http.get(`${environment.apiUrl}/api/Account/ConfirmEmail`, options);
  }

  ForgotPassword(model: ForgotPasswordBindingModel): Observable<any> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.post<any>(`${environment.apiUrl}/api/Account/ForgotPassword`, model, options);
  }

  ResetPassword(model: ResetPasswordBindingModel): Observable<any> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.post<any>(`${environment.apiUrl}/api/Account/ResetPassword`, model, options);
  }

}
