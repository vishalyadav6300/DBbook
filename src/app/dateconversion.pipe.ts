import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateconversion',
  pure:false
})
export class DateconversionPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      value=new Date(value)
      console.log(value)
      const date = value.getDate().toString().padStart(2, '0');
      const month = (value.getMonth() + 1).toString().padStart(2, '0');
      const year = value.getFullYear();
      const hours = value.getHours().toString().padStart(2, '0');
      const minutes = value.getMinutes().toString().padStart(2, '0');
      return `${date}/${month}/${year} ${hours}:${minutes}`;
    } else {
      return value;
    }
  }

}
