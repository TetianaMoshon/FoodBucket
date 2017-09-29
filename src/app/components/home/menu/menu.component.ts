import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../client/api/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    RandProducts = [];
    quantityProducts = 3;
  constructor(protected productService: ProductService) {
  }

  ngOnInit() {
      this.MenuProduct();
  }
    MenuProduct() {
        this.productService.getAllProducts(1, 2, 'desc', 'productId')
            .subscribe(
                products => {
                    while (this.quantityProducts > 0) {
                        this.RandProducts.push(products[Math.floor(Math.random() * (products.length))]);
                        this.quantityProducts--;
                    }
                },
                err => console.log(err)
            );
    }

}
