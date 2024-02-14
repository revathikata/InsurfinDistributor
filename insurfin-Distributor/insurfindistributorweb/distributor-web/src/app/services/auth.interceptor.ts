import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap,catchError,throwError, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refresh = false;
  cloned: HttpRequest<unknown>;
  refersToken: any;
  userId: any;
  constructor(private router: Router, private authservice: AuthServiceService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem("AccessToken") || sessionStorage.getItem("AccessToken2")) {
      let idToken;
      if (sessionStorage.getItem("AccessToken") && !sessionStorage.getItem("AccessToken2")) {
        idToken = JSON.parse(sessionStorage.getItem("AccessToken") ?? '');
        this.cloned = request.clone({
          headers: request.headers.set("AuthorizationKey", "Bearer " + idToken)
        });
      } else {
        idToken = JSON.parse(sessionStorage.getItem("AccessToken2") ?? '');
        this.cloned = request.clone({
          headers: request.headers.set("Authorization", "Bearer " + idToken)
        });
      }
  
      return next.handle(this.cloned).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403)) {
            sessionStorage.removeItem('AccessToken');
            sessionStorage.removeItem('AccessToken2');
            return this.refreshTokenAndRetry(request, next);
          }
          return throwError(err);
        })
      );
    } else {
      return next.handle(request);
    }
  }
  
  private tokenRefreshing = false;
  
  refreshTokenAndRetry(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.tokenRefreshing) {
      this.tokenRefreshing = true;
      return this.RefreshToken().pipe(
        switchMap(() => {
          const idToken = JSON.parse(sessionStorage.getItem("AccessToken2") ?? 'null');
          const cloned = request.clone({
            headers: request.headers.set("Authorization", "Bearer " + idToken)
          });
          return next.handle(cloned);
        }),
        catchError((error: any) => {
          this.tokenRefreshing = false;
          this.router.navigate(['login2']);
          return throwError(error);
        })
      );
    } else {
      // If already refreshing the token, wait and retry after refreshing
      return next.handle(request);
    }
  }
  
  RefreshToken(): Observable<any> {
    this.refersToken = JSON.parse(sessionStorage.getItem('refreshToken') ?? 'null');
    this.userId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
  
    const data = {
      refreshToken: this.refersToken,
      userId: this.userId
    };
  
    return this.authservice.renewAccessToken(data).pipe(
      tap((res: any) => {
        if (res && res.error === false) {
          sessionStorage.setItem('AccessToken2', JSON.stringify(res.data.accessToken));
        }
        this.tokenRefreshing = false;
      })
    );
  }
}