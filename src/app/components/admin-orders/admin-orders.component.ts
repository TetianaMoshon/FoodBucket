import { Component, OnInit } from '@angular/core';
import {PagerService} from "../../services/pagination.service";


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
    showHide: boolean;
array = [{
    "date": "27/05/2015",
    "id": "1",
    "name": "John",
    "food": "pizza,pasta,salad",
    "tel": "0682839534",
    "price": "13,37$",
    "status": "delivered",
},
    {
        "date": "27/05/2015",
        "id": "2",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "3",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "4",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "5",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "6",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "7",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "8",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "9",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "10",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "11",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "12",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "13",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "14",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "15",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "16",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "17",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "18",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "19",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "20",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    }];
pager: any = {};
pagedItems: any[];

  constructor(private pagerService:PagerService) {
      this.showHide = false;
  }

  ngOnInit() {
    this.setPage(1);
  }
setPage(page:number) {
      if (page<1 || page> this.pager.totalPages) {
          return;
      }

      this.pager = this.pagerService.getPager(this.array.length,page);
      this.pagedItems = this.array.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
