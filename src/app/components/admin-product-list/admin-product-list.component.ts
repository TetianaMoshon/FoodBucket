import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from '../../client/api/product.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Subject} from 'rxjs/Subject';
import {PagerService} from '../../services/pagination.service';

@Component({
    selector: 'app-admin-product-list',
    templateUrl: './admin-product-list.component.html',
    styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

    source;
    random;

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
    products;
    pager: any = {};

    ngOnInit() {
        this.fetchData();
        this.random = Date.now();
    }

    constructor(
        protected productService: ProductService,
        private router: Router,
        private pagerService: PagerService
    ) { }

    fetchData() {
        this.defineOffset(this.limit.pageSize, 1);
        this.productService.getAllProductsWithHttpInfo(this.offset, this.limit.pageSize, 'desc', 'productId')
            .subscribe(
                response => {
                    this.products = response.json();
                    this.total = response.headers.get('x-total-records');
                    this.pager = this.pagerService.getPager(this.total, 1);
                    this.source = this.products;

                },
                err => console.log(err)

            );

        this.searchInput$
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(inputData => this.search(inputData));
    }

    onCreateClick(event, eventName: string): void {
        this.changeRoute('/admin/productlist/create');
    }

    onEditClick(event, productId): void {
        this.changeRoute(`/admin/productlist/${productId}/edit`);
    }

    onDeleteClick(event, productId): void {
        this.defineOffset(this.limit.pageSize, this.pager.currentPage);
        if (confirm('Are you really want to delete category with id: ' + productId + ' ?')) {
            this.productService.deleteProductById(parseInt(productId, 10)).subscribe(
                product => {
                    this.productService.getAllProductsWithHttpInfo(0, this.limit.pageSize, 'desc', 'productId')
                        .subscribe(
                        products => {
                            this.source = products.json();
                            this.total = products.headers.get('x-total-records');
                            this.pager = this.pagerService.getPager(this.total, 1);
                        },
                        err => console.log(err)
                    );
                },
                err => console.log(err)
            );
        }
    }

    changeRoute(routeValue) {
        this.router.navigateByUrl(routeValue);
    }

    defineCol(value: string) {
        this.column = value;
    }

    search(searchStr) {
        if (searchStr.trim() !== '') {
            this.productService.getAllProductsWithHttpInfo(0, this.limit.pageSize, 'desc', 'productId', searchStr, this.column)
                .subscribe(res => {
                    this.source = res.json();
                    this.pager = this.pagerService.getPager(this.limit.pageSize, 1); }
                );
        } else {
            this.source = this.products;
            this.pager = this.pagerService.getPager(this.total, 1);
        }

    }

    toggle(state: boolean) {
        this.state = state;
        this.sort = this.state ? 'desc' : 'asc';
    }

    defineOffset(limit: number, page: number) {
        this.offset = page * limit - limit;
    }

    setPage(page: number) {
        this.source = [];
        this.defineOffset(this.limit.pageSize, page);
        if (this.sorted) {
            this.productService.getAllProducts(this.offset, this.limit.pageSize, this.nextSort, this.value )
                .subscribe(products => {
                    this.source = products;
                });
        } else  {
            this.productService.getAllProducts( this.offset, this.limit.pageSize, 'desc', 'productId')
                .subscribe(products => {
                    this.source = products;
                });
        }

        this.pager.currentPage = page;
    }

    onSortClick(value: string): void {
        this.toggle(!this.state);
        this.defineOffset(this.limit.pageSize, this.pager.currentPage);
        this.productService.getAllProducts(this.offset, this.limit.pageSize, this.sort, value )
            .subscribe(products => {
                this.value = value;
                this.source = products;
            });
        this.sorted = true;
        this.nextSort = this.sort;
    }

}
