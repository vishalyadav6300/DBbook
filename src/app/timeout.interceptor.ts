import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  
    const limittime = 10000;
    return next.handle(request)
      .pipe(
        timeout(limittime),
        catchError(error => {
          if (error.name === 'TimeoutError') {
            console.log('Taking too long to respond');
            this.router.navigateByUrl('requesttimeout')
          }
          return throwError(error);
        })
      );
  }
}