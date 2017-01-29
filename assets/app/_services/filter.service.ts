import { Injectable } from '@angular/core';

@Injectable()

export class FilterService {
    filters: string[] = ["current"];

    pushPopFilter(filter) {
        console.log(this.filters);
        console.log(filter);
        let index = this.filters.indexOf(filter);
        console.log(index);
        if(index === -1) {
            this.filters.push(filter);
        } else {
            this.filters.splice(index, 1);
        }
        console.log(this.filters);
    }

    getFilters() {
        return this.filters;
    }
}
