import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../client/api/product.service';

@Component({
    selector: 'app-top',
    templateUrl: './top.component.html',
    styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
    topratedList = [];
    promotionList = [];
    quantityProducts = 2;

    constructor(protected productService: ProductService) {}

    ngOnInit() {
        this.productService.getAllProducts(1, 20, 'desc', 'productId')
            .subscribe(
                products => {
                    products.forEach(product => {
                        if (product.promotions === true) {
                            this.promotionList.push(product);
                        }
                    });

                    while (this.quantityProducts > 0) {
                        this.topratedList.push(this.promotionList[Math.floor(Math.random() * (this.promotionList.length))]);
                        this.quantityProducts--;
                    }
                },
                err => console.log(err));
    }
}
