import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { LoginBindingModel, User } from 'src/app/models/account/account.model';
import { environment } from 'src/environments/environment';
import { LoginBindingModel, User } from '../../models/account/account.model';

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
        // const decodedToken = this.decodeJwt(user.token);
        // console.log(decodedToken)
        if (user) {
          // console.log(user)
          this.getLoggedinUserInfo(user.email).subscribe({
            next: (res: any) => {
              localStorage.setItem('currentUserInfo', JSON.stringify(res))
              // return res
            },
            error: (err: any) => {
              localStorage.clear();
              // return err
            }
          })
        }
        return user;
      }));
  }

  // login(model: LoginBindingModel) {
  //   return this.http.post(`${environment.apiUrl}/api/Account/Login`, model)
  //     .pipe(map((user: any) => {
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.currentUserSubject.next(user);
  //       this.decodeJwt(user.token);
  //       return user;
  //     }));
  // }
  login(model: LoginBindingModel): Promise<any> {
    console.log("url:", environment.apiUrl)
    return lastValueFrom(
      this.http.post(`${environment.apiUrl}/api/Account/Login`, model)
        .pipe(map((user: any) => {
          // Save user to local storage
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(user)
          // Update currentUserSubject
          this.currentUserSubject.next(user);
          // Decode the JWT token
          // const decodedToken = this.decodeJwt(user.accessToken);
          if (user) {
            this.getLoggedinUserInfo(user.email).subscribe({
              next: (res: any) => {
                localStorage.setItem('currentUserInfo', JSON.stringify(res))
                // return res
              },
              error: (err: any) => {
                localStorage.clear();
                // return err
              }
            })
          }

          return user;
        }))
    );
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
  getLoggedinUserInfo(email: string): Observable<any> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams().append('Email', email)
    }
    return this.http.get<any>(`${environment.apiUrl}/api/Account/GetLoggedinUserInfo`, options)
  }
  decodeJwt(token: string) {
    if (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    }

    try {
      const tokenParts = token.split('.'); // Ensure token is in the correct format
      const decodedPayload = atob(tokenParts[1]); // Decode the payload part
      return JSON.parse(decodedPayload);
    } catch (error) {
      // console.error("Failed to decode JWT:", error);
      return null;
    }
    // // console.log(token)
    // var base64Url = token.split('.')[1];
    // var base64 = base64Url.replace('-', '+').replace('_', '/');
    // var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    //   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    // }).join(''));
    // return JSON.parse(jsonPayload);
  }
  isLoggedIn(): boolean {
    var currentUser = localStorage.getItem('currentUser');
    return currentUser ? true : false
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
  clinicId() {
    return this.decodeJwt(JSON.parse(localStorage.getItem('currentUser')!).token).clinicId;
  }
  parentId() {
    return this.decodeJwt(JSON.parse(localStorage.getItem('currentUser')!).token).parentId;
  }
  clinicName() {
    return this.decodeJwt(JSON.parse(localStorage.getItem('currentUser')!).token).clinicName;
  }
}
