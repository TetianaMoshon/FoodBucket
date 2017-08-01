import { Component, OnInit } from '@angular/core';

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


    ListOfImageLinks: string [] = [
       'https://www.bzl.co/story/Delicious-Food-Sandwich-friedclams-1480470367.png',
        'https://1.bp.blogspot.com/-BFHNsu-lK9M/VxtLPQXpowI/AAAAAAAAABU/Y2gPcR24ABYl9fzBimby6jO_P6H-GCgWwCLcB/s640/Allgauer%2527s-Restaurant-Chicago-food.jpg',
        'http://www.westmarkhotels.com/wp-content/uploads/HAP-Westmark-Food-Fairbanks-600x300.jpg',
        'https://www.stack3d.com/wp-content/uploads/2016/08/questketoone.jpg',
        'http://2momsintheraw.com/wp-content/uploads/2017/03/2.jpg',
        'http://simplybarbaramckay.com/wp-content/uploads/2017/03/unnamed-600x300.jpg',
        'http://keepitrelax.com/wp-content/uploads/2014/06/cherry-cake-1-718x404-600x300.jpg',
        'https://irp-cdn.multiscreensite.com/edf87f6a/dms3rep/multi/mobile/6ee3572971854827b083fdcf02acebd9-600x300.dm.edit_rf3aco.jpg',
        'http://brewskibar.com.au/img/home/menu-panel-600b.jpg',
        'http://ameripackfoods.com/wp-content/uploads/2017/04/APF_BLAZIN_SHRIMP_PRODUCT_IMG_17_SM.jpg'

    ];

    constructor() {}

    ngOnInit() {
        this.InitImageSource();
        this.quantityOfPhotos = this.ListOfImageLinks.length;
        this.changeImageSourceWithInterval();
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


    slideToTheRight() {
        this.sourceForThirdImage = this.ListOfImageLinks[(this.initialSourceForThirdImage + this.counter) % this.quantityOfPhotos];
        this.sourceForSecondImage = this.ListOfImageLinks[this.initialSourceForThirdImage];
        this.sourceForFirstImage = this.ListOfImageLinks[this.initialSourceForSecondImage];


        const temp3 = this.initialSourceForThirdImage;
        this.initialSourceForThirdImage = (this.initialSourceForThirdImage + this.counter) % this.quantityOfPhotos;
        const temp2 = this.initialSourceForSecondImage;
        this.initialSourceForSecondImage = temp3;
        this.initialSourceForFirstImage = temp2;

    }

    slideToTheLeft() {
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
