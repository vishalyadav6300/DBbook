import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LiveeventsComponent } from './liveevents/liveevents.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'liveevents', component: LiveeventsComponent }]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
