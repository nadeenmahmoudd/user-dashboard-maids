import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any[], searchTerm: any): any[] {
    if (!users || !searchTerm) {
      return users;
    }
    return users.filter((element) => element.id.toString().includes(searchTerm));
  }
}
