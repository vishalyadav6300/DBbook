import { Pipe, PipeTransform } from '@angular/core';
import { room } from '../models/roommodel';

@Pipe({
  name: 'fliterforrooms'
})
export class FliterforroomsPipe implements PipeTransform {


  transform(rooms: room[], filterRoomType: string): room[] {
    if (!rooms || !filterRoomType) {
      return rooms;
    }

    return rooms.filter(room => room.roomType === filterRoomType);
  }

}
