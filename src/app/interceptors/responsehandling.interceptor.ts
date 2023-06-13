import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class ResponsehandlingInterceptor implements HttpInterceptor {

  constructor(private route:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {//network related or cors orgin
            this.route.navigateByUrl("pagenotfound")
          } else if (error.status === 404) {//page not found
            this.route.navigateByUrl("pagenotfound")
            
          } else if(error.status===401) {//unauthorized access
            this.route.navigateByUrl("pagenotfound")
          }
          else{
            console.log(error)
          }
        }
        return throwError(error);
      })
    );
  }
}
