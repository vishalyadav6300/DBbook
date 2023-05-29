import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FullCalendarModule } from '@fullcalendar/angular'

import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PositivevalidationDirective } from './utilites/positivevalidation.directive';
import { CacheinterceptorInterceptor } from './interceptors/cacheinterceptor.interceptor';
import { RequsettimeoutCompoent } from './requsettimeout/requsettimeout.component';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { ResponsehandlingInterceptor } from './interceptors/responsehandling.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PagenotfoundComponent,
    PositivevalidationDirective,
    RequsettimeoutCompoent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FullCalendarModule,
    NgMultiSelectDropDownModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CacheinterceptorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ResponsehandlingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
