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
      this.ApiService.getAllOrders(25, 20 ).subscribe(orders => {
          this.orders = orders;
          this.setPage(1);
      });
  }
    updateOrder(value, orderIdValue) {
      console.log(value);
      console.log(orderIdValue);
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
setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }

      this.pager = this.pagerService.getPager(this.orders.length, page);
      this.pagedItems = this.orders.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
