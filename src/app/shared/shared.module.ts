import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomeventsComponent } from './roomevents/roomevents.component';
import { FliterforroomsPipe } from './fliterforrooms.pipe';



@NgModule({
  declarations: [
    RoomeventsComponent,
    FliterforroomsPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[FliterforroomsPipe,RoomeventsComponent]
})
export class SharedModule { }
