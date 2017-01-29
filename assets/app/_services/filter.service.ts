import { Injectable } from '@angular/core';

@Injectable()

export class FilterService {
    filters: string[] = ["current"];
    orderBy: string = "end-asc";

    pushPopFilter(filter) {
        let index = this.filters.indexOf(filter);
        if(index === -1) {
            this.filters.push(filter);
        } else {
            this.filters.splice(index, 1);
        }
    }

    setOrder(order) {
        this.orderBy = order;
    }

    getOrder() {
        return this.orderBy;
    }

    getFilters() {
        return this.filters;
    }
}
