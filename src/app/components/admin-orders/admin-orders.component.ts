import { Component, OnInit } from '@angular/core';
import {PagerService} from '../../services/pagination.service';
import {OrderService} from '../../client/api/order.service';
import {Order} from '../../models/order';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
    searchInput$ = new Subject<string>();
    sorted: boolean;
    nextSort: string;
    column: string;
    res;
    total;
    offset;
    limit = this.pagerService.getPager(this.total, 1);
    page;
    value: string;
    state = true;
    sort: string;
    showHide: boolean;
    orders: Order[] = [];
pager: any = {};
pagedItems: any[];
arrayOfIds: number[] = [];
orderTitles;
quantityArray;

  constructor(private pagerService: PagerService, private ApiService: OrderService) {
      this.showHide = false;
  }


    ngOnInit() {
        this.defineOffset(this.limit.pageSize, 1);
        this.ApiService.getAllOrdersWithHttpInfo(this.offset, this.limit.pageSize, 'desc', 'orderId' ).subscribe(response => {
            this.orders = response.json();
            this.total = response.headers.get('x-total-records');
            this.pager = this.pagerService.getPager(this.total, 1);
            this.pagedItems = this.orders;
        });
        this.searchInput$
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(inputData => this.search(inputData));

    }

    defineCol(value: string) {
        this.column = value;
    }

    search(searchStr) {
        if (searchStr.trim() !== '') {
            this.ApiService.getAllOrdersWithHttpInfo(0, this.limit.pageSize, 'desc', 'orderId', searchStr, this.column).subscribe(res =>
                this.pagedItems = res.json());
                this.pager = this.pagerService.getPager(this.limit.pageSize, 1);
        } else {
            this.pagedItems = this.orders;
            this.pager = this.pagerService.getPager(this.total, 1);
        }
    }


    getProductTitles(idOrder) {
      this.ApiService.findOrderById(idOrder).subscribe(res => {
          this.orderTitles = res.products;
          this.quantityArray = res.quantity;
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
            'quantity': [0],
            'discount': 0
        }, orderIdValue).subscribe(res => {});
    }

    toggle(state: boolean) {
        this.state = state;
        this.sort = this.state ? 'desc' : 'asc';
    }

    defineOffset(limit: number, page: number) {
        this.offset = page * limit - limit;
    }


    setPage(page: number) {
      this.pagedItems = [];
      this.defineOffset(this.limit.pageSize, page);
          if (this.sorted) {
              this.ApiService.getAllOrders(this.offset, this.limit.pageSize, this.nextSort, this.value ).subscribe(orders => {
                  this.pagedItems = orders;
              });
          } else  {
              this.ApiService.getAllOrders( this.offset, this.limit.pageSize, 'desc', 'orderId').subscribe(orders => {
                  this.pagedItems = orders;
              });
      }

        this.pager.currentPage = page;
    }

    onSortClick(value: string): void {
        this.toggle(!this.state);
        this.defineOffset(this.limit.pageSize, this.pager.currentPage);
        this.ApiService.getAllOrders(this.offset, this.limit.pageSize, this.sort, value).subscribe(orders => {
            this.value = value;
            this.pagedItems = orders;
        });
        this.sorted = true;
        this.nextSort = this.sort;
    }


}
