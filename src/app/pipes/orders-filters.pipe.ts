import { Pipe, PipeTransform } from '@angular/core';
import {Order} from '../client/index';

@Pipe({
    name: 'ordersfilter',
    pure: false
})

export class OrdersFiltersPipe implements PipeTransform {
    transform(items: Order[], filter: Order): Order[] {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter((item: Order) => this.applyFilter(item, filter));
    }
    applyFilter(order: Order, filter: Order): boolean {
        for (const field in filter) {
            if (filter[field]) {
                if (typeof filter[field] === 'number') {
                    // if (order[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                    //     return false;
                    // }
                    if (order[field] !== filter[field]) {
                        return false;
                    }
                } else if (typeof filter[field] === 'number') {
                    if (order[field] !== filter[field]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
