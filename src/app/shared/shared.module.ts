import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomeventsComponent } from './roomevents/roomevents.component';
import { FliterforroomsPipe } from './fliterforrooms.pipe';
import {NgxPaginationModule} from 'ngx-pagination'



@NgModule({
  declarations: [
    RoomeventsComponent,
    FliterforroomsPipe
  ],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  exports:[FliterforroomsPipe,RoomeventsComponent,NgxPaginationModule]
})
export class SharedModule { }
