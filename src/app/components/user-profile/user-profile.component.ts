import { Component, OnInit } from '@angular/core';
import { UserService } from '../../client/api/user.service';
import { ProductService } from '../../client/api/product.service';
import {ImageService} from '../../services/image/image.service';
import { User } from './user';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
    public user: User;
    public favouritesProduct = [];
    public userData;
    file: File = null;
    imageSrc = '';

  constructor(private findUserByIdAPI: UserService, private productService: ProductService, private imageService: ImageService) {
      this.user = new User(JSON.parse(sessionStorage.getItem('currentUserId')), '', ' ', ' ', 0, ' ', ' ', false, '');
      this.findUserByIdAPI.findUserById(JSON.parse(sessionStorage.getItem('currentUserId')))
          .subscribe(reg => {
              this.user.firstName = reg.firstName;
              this.user.lastName = reg.lastName;
              this.user.email = reg.email;
              this.user.city = reg.city;
              this.user.address = reg.address;
              this.imageSrc = 'image/' + reg.image;
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


    onFileChange(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.file = fileList[0];

            const pattern = /image-*/;
            const reader = new FileReader();

            if (!this.file.type.match(pattern)) {
                alert('Invalid image format. Only .jpg and .png are available');
                return;
            }

            reader.onloadend = this.onReaderLoaded.bind(this);
            reader.readAsDataURL(this.file);
        }
    }
    updateUser(id: number, userObject) {
        this.findUserByIdAPI.updateUserById(id, userObject)
            .subscribe(
                uesr => {
                    if (this.file !== null) {
                        this.uploadUserImageById(id, this.file, 'put');
                    }
                },
                err => console.log(err)
            );
    }
    uploadUserImageById(id, file, method) {
        const entityName = 'user';
        this.imageService.uploadImageByEntityId(id, file, method, entityName);
    }

    onSubmit(form: NgForm) {
        const userObject = {
            image: 'empty path'
        };

     userObject.image = this.imageSrc.replace('image/', '');
        this.updateUser(JSON.parse(sessionStorage.getItem('currentUserId')), userObject);
    }

    private onReaderLoaded(e) {
        const reader = e.target;
        this.imageSrc = reader.result;
    }

  ngOnInit() {
  }


}
