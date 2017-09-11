import { Ng2SmartTableComponent } from 'ng2-smart-table/ng2-smart-table.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {ProductService} from '../../client/api/product.service';
import {settings} from './settings';

@Component({
    selector: 'app-admin-product-list',
    templateUrl: './admin-product-list.component.html',
    styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

    settings = settings;
    source: LocalDataSource;
    constructor(
        protected productService: ProductService,
        private router: Router
    ) {
        this.productService.getAllProducts(1, 2, ["string"])
            .subscribe(
                products => {
                    this.source = new LocalDataSource();
                    this.source.load(products);
                },
                err => console.log(err)
            );
    }

    ngOnInit() {
    }

    onEditClick(event, eventName: string): void {
        const productId = parseInt(event.cells[0].value);
        this.changeRoute('/admin/productlist/productpage');
    }

    onCreateClick(event, eventName: string): void {
        this.changeRoute('/admin/productlist/productpage');

    }

    onDeleteClick(event, eventName: string): void {
        const productId = parseInt(event.cells[0].value);
        if(confirm('Are you really want to delete product with id: ' + productId + ' ?')) {
            this.productService.deleteProductById(productId).subscribe(
                () => { this.source.remove(event.data); },
                err => console.log(err)
            );
        }
    }

    changeRoute(routeValue) {
        this.router.navigateByUrl(routeValue);
    }
}
