import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { LiveeventsComponent } from './liveevents/liveevents.component';
import { SearchComponent } from './search/search.component';
import { BookroomComponent } from './bookroom/bookroom.component';
import { DisplayroomComponent } from './displayroom/displayroom.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    RoomsComponent,
    LiveeventsComponent,
    SearchComponent,
    BookroomComponent,
    DisplayroomComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
