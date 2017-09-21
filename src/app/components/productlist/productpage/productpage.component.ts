import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../client/api/product.service';
import { IngredientService } from '../../../client/api/ingredient.service';
import {Subscription} from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})

export class ProductpageComponent implements OnInit {
    public productData;
    public productIngredients = [];
    public data;
    show = false;
    quantityOfPhotos: number;

    sourceForPreviousImage: any;
    sourceForNextImage: any;

    counter = 1;

    initialSourceForPreviousImage = 0;
    initialSourceForNextImage = 1;

    ListOfImageLinks: string [] = [
        '/assets/images/bistro-shrimp-pasta.jpg',
        '/assets/images/pasta-carbonara.jpg'
    ];

  constructor(
      public productService: ProductService,
      public ingredientService: IngredientService,
      protected route: ActivatedRoute) {}

  ngOnInit() {
      this.InitImageSource();
      this.quantityOfPhotos = this.ListOfImageLinks.length;
      const id = this.route.snapshot.paramMap.get('id');
      this.showProduct(id);
  }
    showProduct(id) {
        this.productService.findProductById(id)
            .subscribe(
                product => {
                    this.productData = product;
                    const current = this;
                    this.productData.ingredients.forEach(function (ingredient) {
                        current.ingredientService.findIngredientById(ingredient.ingredientId)
                            .subscribe(
                                ingr => {
                                    current.productIngredients.push(ingr);
                                }
                            );
                    });
                console.log(current.productIngredients);
                },
                err => console.log(err)
            );
    }

    InitImageSource() {
        this.sourceForPreviousImage = this.ListOfImageLinks[this.initialSourceForPreviousImage];
        this.sourceForNextImage = this.ListOfImageLinks[this.initialSourceForNextImage];
    }

    changeImageSourceByPressingRightArrow() {
        this.slideToTheRight();
    }

    changeImageSourceByPressingLeftArrow() {
        this.slideToTheLeft();
    }

    slideToTheRight() {
        this.sourceForNextImage = this.ListOfImageLinks[this.initialSourceForPreviousImage];
        this.sourceForPreviousImage = this.ListOfImageLinks[this.initialSourceForNextImage];

        const temp3 = this.initialSourceForNextImage;
        this.initialSourceForNextImage = (this.initialSourceForNextImage + this.counter) % this.quantityOfPhotos;
        const temp2 = this.initialSourceForPreviousImage;
        this.initialSourceForPreviousImage = temp2;

    }

    slideToTheLeft() {
        this.sourceForPreviousImage = this.ListOfImageLinks[this.initialSourceForNextImage];
        this.sourceForNextImage = this.ListOfImageLinks[this.initialSourceForPreviousImage];
        const case1 = this.quantityOfPhotos - this.counter;
        const case2 = this.initialSourceForPreviousImage - this.counter;
        this.sourceForPreviousImage = this.ListOfImageLinks[ this.initialSourceForPreviousImage === 0  ? case1 : case2];

        this.initialSourceForNextImage = this.initialSourceForPreviousImage;
        this.initialSourceForPreviousImage = this.initialSourceForPreviousImage === 0  ? this.quantityOfPhotos - this.counter :
            this.initialSourceForPreviousImage - this.counter;
    }

}
