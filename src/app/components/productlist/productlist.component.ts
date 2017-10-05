import { Component, OnInit } from '@angular/core';
import {CartService} from '../../client/api/cart.service';
import {ProductService} from '../../client/api/product.service';
import {PagerService} from '../../services/pagination.service';
import {Product} from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import {CategoryService} from '../../client/api/category.service';
import {Router} from '@angular/router';

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
    pagedItems = [];
    productList = [];
    categoryId = this.route.snapshot.paramMap.get('id');
    categoryTitle: string;
    page;

    constructor(
        private productService: ProductService,
        private pagerService: PagerService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.showHide = false;
    }

  ngOnInit() {
      // this.populateIdFieldOfProduct();
      this.showProductsFromCategory(this.categoryId);
  }

    showProductsFromCategory(categoryId) {
        this.categoryService.findCategoryById(categoryId)
            .subscribe(
                category => {
                    this.categoryTitle = category.title;
                        this.productService.getAllProducts(0, 25, 'desc', 'productId')
                            .subscribe(products => {
                                products.forEach(product => {
                                    if (product.category === category.title) {
                                        const {productId, title, description, image, price} = product;
                                        this.priceOfChosenProduct = price;
                                        this.productList.push({productId, title, description, image});
                                    }
                                });
                                this.setPage(1);
                            });
                });
    }
    changeRoute(routeValue) {
        this.router.navigateByUrl(routeValue);
    }

    onShowProductClick(event, id): void {
        this.changeRoute(`/product/${id}`);
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // this.pager.currentPage = page;
        this.pager = this.pagerService.getPager(this.productList.length, page, 6);
        this.pagedItems = this.productList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
