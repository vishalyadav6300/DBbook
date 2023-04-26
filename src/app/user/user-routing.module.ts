import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookroomComponent } from './bookroom/bookroom.component';
import { DisplayroomComponent } from './displayroom/displayroom.component';
import { HomeComponent } from './home/home.component';
import { LiveeventsComponent } from './liveevents/liveevents.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UserComponent } from './user.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: 'home', component: HomeComponent},
      {path:'book/:id',component:BookroomComponent},
      { path: 'rooms', component: RoomsComponent },
      {path:'display-room' ,component:DisplayroomComponent},
      { path: 'liveevents', component: LiveeventsComponent },
      { path:'user-profile',component:UserprofileComponent }]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
