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
    public id = 5;
    public userData;
    public userProducts = [];
  constructor(private findUserByIdAPI: UserService, private productService: ProductService) {
      this.user = new User(JSON.parse(sessionStorage.getItem('currentUserId')), '', ' ', ' ', 0, ' ', ' ', false);
      this.findUserByIdAPI.findUserById(JSON.parse(sessionStorage.getItem('currentUserId')))
          .subscribe(reg => {
              this.user.firstName = reg.firstName;
              this.user.lastName = reg.lastName;
              this.user.email = reg.email;
              this.user.city = reg.city;
              this.user.address = reg.address;
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
                    console.log(this.userData);
                    this.userData.favourites.forEach(function (product) {
                        console.log(product);
                        current.productService.findProductById(product)
                            .subscribe(
                                prod => {
                                    current.favouritesProduct.push(prod);
                                    console.log(current.favouritesProduct);
                                }
                            );
                    });
                },
                err => console.log(err)
            );
    }

  changeEditability(event) {
     event.currentTarget.parentElement.setAttribute('contenteditable', 'true');
     event.currentTarget.parentElement.focus();
  }

  showAchievements(event) {
     const elem = event.currentTarget.nextElementSibling;
     elem.classList.toggle('is-show');
     event.currentTarget.classList.toggle('active');
     elem.nextElementSibling.classList.toggle('hide');
  }

  highlight(event) {
      const elem = event.currentTarget.nextElementSibling.nextElementSibling;
      elem.classList.toggle('highlight');
  }

  ngOnInit() {
  }


}
