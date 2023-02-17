import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { LoginBindingModel, User } from 'src/app/models/account/account.model';
import { environment } from 'src/environments/environment';
import { LoginBindingModel, User } from '../models/account/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  saveToken(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.decodeJwt(user.token);
    return user;
  }

  globalLogin(model: LoginBindingModel) {
    return this.http.post(`${environment.apiUrl}/api/Account/GlobalLogin`, model)
      .pipe(map((user: any) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.decodeJwt(user.token);
        return user;
      }));
  }

  login(model: LoginBindingModel) {
    return this.http.post(`${environment.apiUrl}/api/Account/Login`, model)
      .pipe(map((user: any) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.decodeJwt(user.token);
        return user;
      }));
  }

  refresh_token(): Observable<any> {
    let refreshTokenRequest: any = {
      AccessToken: JSON.parse(localStorage.getItem('currentUser')!).token,
      RefreshToken: JSON.parse(localStorage.getItem('currentUser')!).refreshToken
    };
    return this.http.post<any>(`${environment.apiUrl}/api/Account/refresh-token`, refreshTokenRequest)
  }

  logOut(): void {
    localStorage.clear();
    this.currentUserSubject = new BehaviorSubject<User>({} as User);
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    })
  }

  decodeJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  currentUserId() {
    return this.decodeJwt(JSON.parse(localStorage.getItem('currentUser')!).token).id;
  }
  currentUserName() {
    return this.decodeJwt(JSON.parse(localStorage.getItem('currentUser')!).token).userName;
  }
  currentUserFirstName() {
    return this.decodeJwt(JSON.parse(localStorage.getItem('currentUser')!).token).firstName;
  }
  currentUserLastName() {
    return this.decodeJwt(JSON.parse(localStorage.getItem('currentUser')!).token).lastName;
  }
  currentUserRole() {
    return this.decodeJwt(JSON.parse(localStorage.getItem('currentUser')!).token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }
  companyId() {
    return this.decodeJwt(JSON.parse(localStorage.getItem('currentUser')!).token).companyId;
  }
  parentId() {
    return this.decodeJwt(JSON.parse(localStorage.getItem('currentUser')!).token).parentId;
  }
  companyName() {
    return this.decodeJwt(JSON.parse(localStorage.getItem('currentUser')!).token).companyName;
  }
}
