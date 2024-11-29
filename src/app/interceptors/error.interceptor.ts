import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, throwError, of } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/core/authentication.service';
import { mergeMap, delay, retryWhen } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
        this.authenticationService.logOut();
        location.reload();
      }
      return throwError(() => err);
    }))
  }
}