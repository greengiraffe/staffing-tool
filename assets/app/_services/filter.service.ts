import { Injectable } from '@angular/core';

@Injectable()

export class FilterService {
    filters: string[] = ["current"];
    orderBy: string = "end-asc";
    togglePast: boolean = false;

    pushPopFilter(filter) {
        if(filter === "past") {
            this.togglePast = !this.togglePast;

            if(this.togglePast) {
                var currentIndex = this.filters.indexOf("current");
                if(currentIndex != -1) { this.filters.splice(currentIndex, 1); }
                this.filters.push(filter);
            } else {
                var pastIndex = this.filters.indexOf(filter);
                if(pastIndex != -1) { this.filters.splice(pastIndex, 1); }
                this.filters.push("current");
            }
        } else {
            let index = this.filters.indexOf(filter);
            if(index === -1) {
                this.filters.push(filter);
            } else {
                this.filters.splice(index, 1);
            }
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
