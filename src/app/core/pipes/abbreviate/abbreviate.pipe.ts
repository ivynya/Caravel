import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviate'
})
export class AbbreviatePipe implements PipeTransform {

  transform(value: string): unknown {
    if (!value || !value.match(/[A-Z]/g))
      return value ? value[0].toUpperCase() : 'C';
    return value.match(/[A-Z]/g).join('').substring(0, 2);
  }

}
