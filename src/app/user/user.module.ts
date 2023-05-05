import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { LiveeventsComponent } from './liveevents/liveevents.component';
import { BookroomComponent } from './bookroom/bookroom.component';
import { DisplayroomComponent } from './displayroom/displayroom.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FullCalendarModule} from '@fullcalendar/angular'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SearchPipe } from '../search.pipe';
import { UserprofileComponent } from './userprofile/userprofile.component'
import { DateconversionPipe } from '../dateconversion.pipe';
import {NgxPaginationModule} from 'ngx-pagination'
import { LoadingDirective } from '../Utilites/Loadingspinner';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    RoomsComponent,
    LiveeventsComponent,
    BookroomComponent,
    DisplayroomComponent,
    SearchPipe,
    UserprofileComponent,
    DateconversionPipe,
    LoadingDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgMultiSelectDropDownModule,
    NgxPaginationModule
  ]
})
export class UserModule { }
