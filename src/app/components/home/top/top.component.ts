import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../client/api/product.service';

@Component({
    selector: 'app-top',
    templateUrl: './top.component.html',
    styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
    topratedList = [];
    quantityProducts = 3;

    constructor(protected productService: ProductService) {}

    ngOnInit() {
        this.productService.getAllProducts(1, 20, 'desc', 'productId')
            .subscribe(
                products => {
                    while (this.quantityProducts > 0) {
                        this.topratedList.push(products
                            [Math.floor(Math.random() * (products.length))]
                        );
                        this.quantityProducts--;
                    }
                    console.log(this.topratedList);
                },
                err => console.log(err));
    }
}
