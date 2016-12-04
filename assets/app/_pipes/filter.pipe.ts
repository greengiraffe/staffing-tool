import { Pipe, PipeTransform } from '@angular/core';

//Todo: Comments, peps. Comments...
@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    transform(items: any[], key : string, value : string): any[] {
        if (!items) return [];
        if (value === undefined) return items;
        return items.filter(item => {
            let left = item[key].toLowerCase();
            let right = value.toLowerCase();
            return left.includes(right)
        });
    }
}
