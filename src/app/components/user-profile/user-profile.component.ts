import { Component, OnInit } from '@angular/core';
import { UserService } from '../../client/api/user.service';
import { ProductService } from '../../client/api/product.service';

import { User } from './user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
    public user: User;
    public favouritesProduct = [];
    public userData;

  constructor(private findUserByIdAPI: UserService, private productService: ProductService) {
      this.user = new User(JSON.parse(sessionStorage.getItem('currentUserId')), '', ' ', ' ', 0, ' ', ' ', false, '');
      this.findUserByIdAPI.findUserById(JSON.parse(sessionStorage.getItem('currentUserId')))
          .subscribe(reg => {
              this.user.firstName = reg.firstName;
              this.user.lastName = reg.lastName;
              this.user.email = reg.email;
              this.user.city = reg.city;
              this.user.address = reg.address;
              this.user.image = reg.image;
            }, err => {
              console.log('error reg' + err);
          });
      this.showFavouriteProducts(JSON.parse(sessionStorage.getItem('currentUserId')));
  }

    showFavouriteProducts(id) {
        this.findUserByIdAPI.findUserById(id)
            .subscribe(
                user => {
                    this.userData = user;
                    const current = this;
                    this.userData.favourites.forEach(function (product) {
                        current.productService.findProductById(product)
                            .subscribe(
                                prod => {
                                        const {productId, title, image} = prod;
                                    current.favouritesProduct.push({productId, title, image});

                                    // current.favouritesProduct.push(prod);
                                }
                            );
                    });
                },
                err => console.log(err)
            );
    }

  ngOnInit() {
  }


}
