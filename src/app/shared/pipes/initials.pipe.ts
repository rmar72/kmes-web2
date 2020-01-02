import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return value.substring(0, 2).toUpperCase();
  }

}
