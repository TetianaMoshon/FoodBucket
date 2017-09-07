import { Component, OnInit } from '@angular/core';
import {PagerService} from '../../services/pagination.service';
import {OrderService} from '../../client/api/order.service';
import {Order} from '../../client/model/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
    showHide: boolean;
// orders: Order[] = [{
//     'date': '27/05/2015',
//     'id': 1,
//     'name': 'John',
//     'food': 'pizza,pasta,salad',
//     'tel': 345,
//     'price': 1337 ,
//     'status': 'delivered',
// },
//     {
//         'date': '27/05/2015',
//         'id': 2,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 3,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 4,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 5,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 6,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 7,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 8,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 9,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 10,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 11,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 12,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 13,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 14,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 15,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 16,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//     {
//         'date': '27/05/2015',
//         'id': 17,
//         'name': 'John',
//         'food': 'pizza,pasta,salad',
//         'tel': 345,
//         'price': 1337 ,
//         'status': 'delivered',
//     },
//
// ];
    orders: Order[] = [];
pager: any = {};
pagedItems: any[];
// filter: Order = new Order();
  constructor(private pagerService: PagerService, private ApiService: OrderService) {
      this.showHide = false;
  }

  ngOnInit() {
    // this.ApiService.putOrder({
    //
    //     username: 'Vasyan',
    //
    //   city: 'Kiev',
    //
    //   price: 45,
    //
    //   address: 'Myhailivska 45',
    //
    //   status: 'Delivered',
    //
    //   products: [1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ],
    // }).subscribe((postedOrder) => {
    //     console.log(postedOrder);
    // });
      this.ApiService.getAllOrders(0, 20 ).subscribe(orders => {
          this.orders = orders;
          this.pager = this.pagerService.getPager(orders.length, 1);
          this.pagedItems = orders.slice(this.pager.startIndex, this.pager.endIndex + 1);

      });
  }
setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }

      // this.pager = this.pagerService.getPager(this.orders.length, page);
      // this.pagedItems = this.orders.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
