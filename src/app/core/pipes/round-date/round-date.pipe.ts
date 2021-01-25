import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundDate'
})
export class RoundDatePipe implements PipeTransform {

  transform(date: Date): Date {
    return new Date(
      date.getFullYear(), 
      date.getMonth(), 
      date.getDate()
    );
  }

}
