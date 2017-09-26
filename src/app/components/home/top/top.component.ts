import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../client/api/product.service';

@Component({
    selector: 'app-top',
    templateUrl: './top.component.html',
    styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
    topratedList = [];

    constructor(protected productService: ProductService) {}

    ngOnInit() {
        this.productService.getAllProducts(1, 2, true)
            .subscribe(
                products => {
                    products.forEach(product => {
                        if (product.promotions === true) {
                            const { productId, title, image} =  product;
                            this.topratedList.push({ productId, title, image});
                        }});
                });
    }
}
