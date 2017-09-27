import { Component, OnInit } from '@angular/core';
import {PromotionService} from '../../client/api/promotion.service';
import {Promotion} from '../../client/model/promotion';


@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

    promotions: Promotion[];
    // promotions: Promotion;

    windowWidth;
    quantityOfPhotos: number;

    sourceForFirstImage: any;
    sourceForSecondImage: any;
    sourceForThirdImage: any;
    captionForFirstImage: any;
    captionForSecondImage: any;
    captionForThirdImage: any;
    descriptionForFirstImage: any;
    descriptionForSecondImage: any;
    descriptionForThirdImage: any;
    counter = 1;

    time = 3000;

    initialSourceForFirstImage = 0;
    initialSourceForSecondImage = 1;
    initialSourceForThirdImage = 2;


    OneImageView  = false;
    PartialView = false;
    FullScreenView = true;

    ListOfImageLinks: string [] = [];
    arrayOfTitles: string[] = [];
    descriptionArray: string[] = [];

    constructor(private promotionService: PromotionService) {}

    ngOnInit() {
        this.windowWidth = {
            target : {
                innerWidth: window.innerWidth
            }
        };

        this.onResize(this.windowWidth);
        this.promotionService.getPromotion(0, 20, true)
            .subscribe(promotions => {
                promotions.forEach(promotion => {
                    this.ListOfImageLinks.push(promotion.image);
                    this.arrayOfTitles.push(promotion.title);
                    this.descriptionArray.push(promotion.description);
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


    slideToTheRight() {
        this.sourceForThirdImage = this.ListOfImageLinks[(this.initialSourceForThirdImage + this.counter) % this.quantityOfPhotos];
        this.sourceForSecondImage = this.ListOfImageLinks[this.initialSourceForThirdImage];
        this.sourceForFirstImage = this.ListOfImageLinks[this.initialSourceForSecondImage];
        this.captionForThirdImage = this.arrayOfTitles[(this.initialSourceForThirdImage + this.counter) % this.quantityOfPhotos];
        this.captionForSecondImage = this.arrayOfTitles[this.initialSourceForThirdImage];
        this.captionForFirstImage = this.arrayOfTitles[this.initialSourceForSecondImage];
        this.descriptionForThirdImage = this.descriptionArray[(this.initialSourceForThirdImage + this.counter) % this.quantityOfPhotos];
        this.descriptionForSecondImage = this.descriptionArray[this.initialSourceForThirdImage];
        this.descriptionForFirstImage = this.descriptionArray[this.initialSourceForSecondImage];


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
        this.captionForThirdImage = this.arrayOfTitles[this.initialSourceForSecondImage];
        this.captionForSecondImage = this.arrayOfTitles[this.initialSourceForFirstImage];
        this.captionForFirstImage = this.arrayOfTitles[ this.initialSourceForFirstImage === 0  ? this.quantityOfPhotos - this.counter :
            this.initialSourceForFirstImage - this.counter
            ];
        this.descriptionForThirdImage = this.descriptionArray[this.initialSourceForSecondImage];
        this.descriptionForSecondImage = this.descriptionArray[this.initialSourceForFirstImage];
        this.descriptionForFirstImage = this.descriptionArray[ this.initialSourceForFirstImage === 0  ? this.quantityOfPhotos - this.counter :
            this.initialSourceForFirstImage - this.counter
            ];

        this.initialSourceForThirdImage = this.initialSourceForSecondImage;
        this.initialSourceForSecondImage = this.initialSourceForFirstImage;
        this.initialSourceForFirstImage = this.initialSourceForFirstImage === 0  ? this.quantityOfPhotos - this.counter :
            this.initialSourceForFirstImage - this.counter;
    }

    onResize(event) {
        this.windowWidth = event.target.innerWidth;
        if (this.windowWidth < 768) {
            this.OneImageView = true;
            this.PartialView = false;
            this.FullScreenView = false;
        }else if (this.windowWidth >= 768  && event.target.innerWidth < 991) {
            this.PartialView = true;
            this.OneImageView = false;
            this.FullScreenView = false;
        } else if (this.windowWidth >= 991  && event.target.innerWidth < 1170) {
            this.PartialView = true;
            this.OneImageView = false;
            this.FullScreenView = false;
        } else if (this.windowWidth >= 1170  && event.target.innerWidth < 1200) {
            this.PartialView = true;
            this.OneImageView = false;
            this.FullScreenView = false;
        } else if (this.windowWidth >= 1200) {
            this.FullScreenView  = true;
            this.PartialView = false;
            this.OneImageView = false;
        }

    }

}
