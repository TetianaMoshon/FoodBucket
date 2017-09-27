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
    id: number;
    priceOfChosenProduct;
    cartContentObjCreated = false;
    idOfLoggedinUser = 4444;
    arrayOfCartOrders = [];
    pager: any = {};
    pagedItems: any[];
    categoryId = this.route.snapshot.paramMap.get('id');
    categoryTitle: string;

    constructor(
        private cartService: CartService,
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
      this.idOfLoggedinUser = this.getIdOfLoggedInUserFromLocalStorage();
      this.showProductsFromCategory(this.categoryId);
  }

    showProductsFromCategory(categoryId) {
        this.categoryService.findCategoryById(categoryId)
            .subscribe(
                category => {
                    this.categoryTitle = category.title;
                        this.productService.getAllProducts(0, 20)
                            .subscribe(products => {
                                products.forEach(product => {
                                    if (product.category === category.title) {
                                        const {productId, title, description, image, price} = product;
                                        this.priceOfChosenProduct = price;
                                        this.products.push({productId, title, description, image});
                                    }
                                });
                                console.log(this.products);
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

        this.pager = this.pagerService.getPager(this.products.length, page);
        this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    addProductToCart(e) {
        this.cartContentObjCreated = JSON.parse(localStorage.getItem('cartContentObjCreated'));
        if (!this.cartContentObjCreated) {
            // use POST method

            // let's create cartOrder
            const newCartOrder = {
                productId: parseInt(e.target.id),
                // when cart is first created quantity is 1
                quantity: 1
            };
            const newCart = {
                orderedProducts: [
                    newCartOrder
                ],
                // when cart is first created total price is initialized to zero as it's calculated in cart-box.component.ts
                totalPriceOfAllDishes: 0
            };

            this.cartService.createCartForUserById(this.idOfLoggedinUser, newCart).subscribe(
                cart => {
                    localStorage.setItem('showAPhrase', JSON.stringify(false));
                    console.log('What is in the cart ', cart);
                    const {orderedProducts} = cart;
                    orderedProducts.forEach(cartOrder => {
                        this.arrayOfCartOrders.push(cartOrder);
                        localStorage.setItem('cartContentObjCreated', JSON.stringify(true));
                    });
                },
                err => console.log('Error has happened ' + err )
            );

        } else {
            if (this.findIdInArray(e)) {

                console.log('You have already added this product to your cart');


            }else {
                console.log('Let us add new cartOrder / cartOrders to your cart');
                // add cartOrders to the created cartContentObjCreated

                // let's push new CartOrder into arrayOfCartOrders
                this.arrayOfCartOrders.push({productId: parseInt(e.target.id), quantity: 1});
                // console.log(' this.arrayOfCartOrders ',  this.arrayOfCartOrders);
                // let's created updatedCartOrder
                console.log('array with added items ', this.arrayOfCartOrders);
                const updatedCart = {
                    orderedProducts:
                    this.arrayOfCartOrders,
                    // when cart is first created total price is the price of a clicked product
                    totalPriceOfAllDishes: 0
                };

                this.cartService.updateCartContentById(this.idOfLoggedinUser, updatedCart).subscribe(updatedData => {
                    console.log('updatedCart returned from backend ', updatedData);
                });

            }

        }
    }

    private findIdInArray(e) {
        const isAlreadyInIdArray = this.arrayOfCartOrders.find(cartOrder => {
            return cartOrder.productId === parseInt(e.target.id);
        });
        return isAlreadyInIdArray;
    }


    private getIdOfLoggedInUserFromLocalStorage() {
        if (JSON.parse(sessionStorage.getItem('currentUserId'))) {
            const user = JSON.parse(sessionStorage.getItem('currentUserId'));
            return user;
        } else {
            return;
        }
    }
}
