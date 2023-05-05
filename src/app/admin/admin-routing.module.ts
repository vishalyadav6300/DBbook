import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomeventsComponent } from '../shared/roomevents/roomevents.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { AdminComponent } from './admin.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{ path: '', component: AdminComponent ,children:[
  {path:'employee',component:AddEmployeeComponent},
  {path:'room',component:AddRoomComponent},
  {path:'all-rooms',component:AllRoomsComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'room-events/:room-name',component:RoomeventsComponent},
  {path:"",redirectTo:"dashboard",pathMatch:"full"}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
