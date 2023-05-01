import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {mergeMap, delay, retryWhen} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request=request.clone({
      setHeaders: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`|| ''
      }
    })
    return next.handle(request);
  }
}
