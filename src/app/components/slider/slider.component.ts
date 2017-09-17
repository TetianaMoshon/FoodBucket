import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../client/api/product.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

    quantityOfPhotos: number;

    sourceForFirstImage: any;
    sourceForSecondImage: any;
    sourceForThirdImage: any;

    counter = 1;

    time = 3000;

    initialSourceForFirstImage = 0;
    initialSourceForSecondImage = 1;
    initialSourceForThirdImage = 2;


    OneImageView  = false;
    PartialView = false;
    FullScreenView = true;

    ListOfImageLinks: string [] = [];


    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getAllProducts(0, 20, true, true).subscribe(products => {
            products.forEach(product => {
                this.ListOfImageLinks.push(product.image);
            });
            this.InitImageSource();
            this.quantityOfPhotos = this.ListOfImageLinks.length;
            this.changeImageSourceWithInterval();
        });

    }


    InitImageSource() {
        this.sourceForFirstImage = this.ListOfImageLinks[this.initialSourceForFirstImage];
        this.sourceForSecondImage = this.ListOfImageLinks[this.initialSourceForSecondImage];
        this.sourceForThirdImage = this.ListOfImageLinks[this.initialSourceForThirdImage];
    }

    changeImageSourceWithInterval() {
        setInterval(
            () =>  {
                this.slideToTheRight();
            }, this.time);
    }


    changeImageSourceByPressingRightArrow() {
        this.slideToTheRight();
    }

    changeImageSourceByPressingLeftArrow() {
        this.slideToTheLeft();
    }


    slideToTheLeft() {
        this.sourceForThirdImage = this.ListOfImageLinks[(this.initialSourceForThirdImage + this.counter) % this.quantityOfPhotos];
        this.sourceForSecondImage = this.ListOfImageLinks[this.initialSourceForThirdImage];
        this.sourceForFirstImage = this.ListOfImageLinks[this.initialSourceForSecondImage];


        const temp3 = this.initialSourceForThirdImage;
        this.initialSourceForThirdImage = (this.initialSourceForThirdImage + this.counter) % this.quantityOfPhotos;
        const temp2 = this.initialSourceForSecondImage;
        this.initialSourceForSecondImage = temp3;
        this.initialSourceForFirstImage = temp2;

    }

    slideToTheRight() {
        this.sourceForThirdImage = this.ListOfImageLinks[this.initialSourceForSecondImage];
        this.sourceForSecondImage = this.ListOfImageLinks[this.initialSourceForFirstImage];
        this.sourceForFirstImage = this.ListOfImageLinks[ this.initialSourceForFirstImage === 0  ? this.quantityOfPhotos - this.counter :
            this.initialSourceForFirstImage - this.counter
            ];

        this.initialSourceForThirdImage = this.initialSourceForSecondImage;
        this.initialSourceForSecondImage = this.initialSourceForFirstImage;
        this.initialSourceForFirstImage = this.initialSourceForFirstImage === 0  ? this.quantityOfPhotos - this.counter :
            this.initialSourceForFirstImage - this.counter;
    }

    onResize(event) {
        if (event.target.innerWidth < 768) {
            this.OneImageView = true;
            this.PartialView = false;
            this.FullScreenView = false;
        }else if (event.target.innerWidth >= 768  && event.target.innerWidth < 991) {
            this.PartialView = true;
            this.OneImageView = false;
            this.FullScreenView = false;
        } else if (event.target.innerWidth >= 991  && event.target.innerWidth < 1170) {
            this.PartialView = true;
            this.OneImageView = false;
            this.FullScreenView = false;
        } else if (event.target.innerWidth >= 1170  && event.target.innerWidth < 1200) {
            this.PartialView = true;
            this.OneImageView = false;
            this.FullScreenView = false;
        } else if (event.target.innerWidth >= 1200) {
            this.FullScreenView  = true;
            this.PartialView = false;
            this.OneImageView = false;
        }

    }

}
