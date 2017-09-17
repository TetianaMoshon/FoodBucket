import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../client/api/product.service';
import {PagerService} from '../../services/pagination.service';
import {Product} from '../../models/product';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
    showHide: boolean;
    products: Product[] = [];
    priceOfChosenProduct;
    pager: any = {};
    pagedItems: any[];
    constructor(
        private productService: ProductService,
        private pagerService: PagerService
    ) {
        this.showHide = false;
    }

  ngOnInit() {
      this.populateIdFieldOfProduct();
  }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        this.pager = this.pagerService.getPager(this.products.length, page);
        this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


    populateIdFieldOfProduct() {
        this.productService.getAllProducts(0, 20).subscribe(products => {
            products.forEach(product => {
                const {productId, title, description, image, price} =  product;
                this.priceOfChosenProduct = price;
                this.products.push({productId, title, description, image});
            });
            this.setPage(1);
        });

    }

}
