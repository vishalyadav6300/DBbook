import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheinterceptorInterceptor implements HttpInterceptor {

  private cache = new Map<string, HttpResponse<any>>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.url);

    if (cachedResponse) {
      const delay = 10000; // 10 seconds
      const expirationTime = cachedResponse.headers.get('expires');

      if (expirationTime && Date.parse(expirationTime) < Date.now() + delay) {
        this.cache.delete(req.url);
      } else {
        console.log('Using cached response for: ', req.url);
        return of(cachedResponse);
      }
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event.type === 4) { // 4 represents HttpResponse
          console.log('Caching response for: ', req.url);
          this.cache.set(req.url, event);
        }
      })
    );
  }
}
