import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { LiveeventsComponent } from './liveevents/liveevents.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    RoomsComponent,
    LiveeventsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
