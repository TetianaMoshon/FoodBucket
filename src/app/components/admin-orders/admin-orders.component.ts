import { Component, OnInit } from '@angular/core';
import {PagerService} from '../../services/pagination.service';
import {OrderService} from '../../client/api/order.service';
import {Order} from '../../models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
    total
    value: string
    state = true
    sort: string
    showHide: boolean;
    orders: Order[] = [];
pager: any = {};
pagedItems: any[];
 filter: Order = {
     date: '',
     orderId: null,
     username: '',
     city: '',
     products: [],
     price : null,
     address: '' ,
     status: ''
 };
  constructor(private pagerService: PagerService, private ApiService: OrderService) {
      this.showHide = false;
  }


    ngOnInit() {
        this.ApiService.getAllOrdersWithHttpInfo(1, 20, 'desc', 'orderId' ).subscribe(response => {
            this.orders = response.json();
            this.total = response.headers.get('x-total-records');
            this.setPage(1);
        });
    }

    updateOrder(value, orderIdValue) {
        this.ApiService.updateOrderById({
            'orderId': 0,
            'date': 'string',
            'username': 'string',
            'city': 'string',
            'price': 0,
            'address': 'string',
            'status': value,
            'phone': 'string',
            'products': [
                0
            ],
            'measure': 'string',
            'quantity': 0,
            'discount': 0
        }, orderIdValue).subscribe(
            res => {
                console.log(res);
            }
        );
    }

    toggle(state: boolean) {
        this.state = state;
        this.sort = this.state ? 'desc' : 'asc';
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }


        this.pager = this.pagerService.getPager(this.total, page);
        this.pagedItems = this.orders.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    onSortClick(value: string): void {
        this.toggle(!this.state);
        this.ApiService.getAllOrders(1, 20, this.sort, value ).subscribe(orders => {
            this.value = value;
            this.orders = orders;
            this.setPage(1);
        });
    }
}
