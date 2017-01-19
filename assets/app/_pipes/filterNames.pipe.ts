import { Pipe, PipeTransform } from '@angular/core';

//Todo: Comments, peps. Comments...
@Pipe({ name: 'filterNames' })
export class FilterNamesPipe implements PipeTransform {
    transform(items: any[], firstName: string, lastName: string, value: string): any[] {
        if (!items) return [];
        if (value == null || firstName == null || lastName == null) return items;

        return items.filter(item => {
            let fName = item[firstName].toLowerCase();
            let lName = item[lastName].toLowerCase();
            let right = value.toLowerCase();
            return fName.includes(right) || lName.includes(right);
        });
    }
}
