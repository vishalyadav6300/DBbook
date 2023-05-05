import { Pipe, PipeTransform } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { room } from './models/roommodel';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: room[], value:string): room[] {
    if (!values || !value) {
      return values
    }
    return values.filter((valuesObj: any) => {
      if (valuesObj.roomName.toLowerCase().indexOf(value.toLowerCase()) != -1) {
        return valuesObj
      }
    })
  }

}
