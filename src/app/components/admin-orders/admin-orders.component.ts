import { Component, OnInit } from '@angular/core';
import {PagerService} from '../../services/pagination.service';
import {OrderService} from '../../client/api/order.service';
import {Order} from "../../models/order";

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
setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }

      this.pager = this.pagerService.getPager(this.orders.length, page);
      this.pagedItems = this.orders.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
