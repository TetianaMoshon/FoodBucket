import { Component, OnInit } from '@angular/core';
import {PagerService} from '../../services/pagination.service';
import {Order} from "../../models/order";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
    showHide: boolean;
orders: Order[] = [{
    'date': '27/05/2015',
    'id': 1,
    'name': 'John',
    'food': 'pizza,pasta,salad',
    'tel': 345,
    'price': 1337 ,
    'status': 'delivered',
},
    {
        'date': '27/05/2015',
        'id': 2,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 3,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 4,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 5,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 6,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 7,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 8,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 9,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 10,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 11,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 12,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 13,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 14,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 15,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id': 16,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },
    {
        'date': '27/05/2015',
        'id':17,
        'name': 'John',
        'food': 'pizza,pasta,salad',
        'tel': 345,
        'price': 1337 ,
        'status': 'delivered',
    },

];
pager: any = {};
pagedItems: any[];
filter: Order = new Order();
  constructor(private pagerService: PagerService) {
      this.showHide = false;
  }

  ngOnInit() {
    this.setPage(1);
  }
setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }

      this.pager = this.pagerService.getPager(this.orders.length, page);
      this.pagedItems = this.orders.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
