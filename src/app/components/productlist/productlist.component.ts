import { Component, OnInit } from '@angular/core';
import {CartService} from '../../client/api/cart.service';
import {ProductService} from '../../client/api/product.service';
import {PagerService} from '../../services/pagination.service';
import {Product} from '../../models/product';
import {ProductModel} from '../admin-product-list/admin-product-page/productModel';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
        private pagerService: PagerService,
        private router: Router,
        protected route: ActivatedRoute
    ) {
        this.showHide = false;
    }

  ngOnInit() {
      this.populateIdFieldOfProduct();
  }

    goToProductDetails(product: Product): void {
        // const link = ['category/productlist', product.productId];
        // this.router.navigate(link);

        this.changeRoute(`/category/productlist/${product.productId}`);
    }

    changeRoute(routeValue) {
        this.router.navigateByUrl(routeValue);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        this.pager = this.pagerService.getPager(this.products.length, page, 9);

        this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log(`paged items ${this.pagedItems}`);
    }


    populateIdFieldOfProduct() {
        this.productService.getAllProducts(0, 20, true, 'desc', 'productId').subscribe(products => {
            products.forEach(product => {
                const {productId, title, description, image, price} =  product;
                this.priceOfChosenProduct = price;
                this.products.push({productId, title, description, image});
            });
            this.setPage(1);
        });

    }

}
