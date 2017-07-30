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
        'http://2.bp.blogspot.com/-CmBgofK7QzU/TVj3u3N1h2I/AAAAAAAADN8/OszBhGvvXRU/s640/tumblr_lg7h9gpbtP1qap9qio1_500.jpeg',
        'https://shadikdaily.files.wordpress.com/2012/04/all-black-500x500.jpg',
        'http://inspirationfeed.com/wp-content/uploads/2010/06/Evolution_by_will_yen-500x500.png',
        'http://smhttp.64097.nexcesscdn.net/80544EA/dfcontent/wp-content/uploads/2012/08/Pitshark.jpg',
        'http://farm4.staticflickr.com/3137/2698866948_f273755a09_z.jpg?zz=1',
        'https://farm6.staticflickr.com/5348/8412115396_eb91d09339.jpg',
        'https://farm6.staticflickr.com/5112/6970631088_f8a396cc6a.jpg',
        'http://www.newcastlewildflower.com.au/wp-content/uploads/2013/05/9fkUCY02te7bqobeZzdT9SEio1_500.jpg',
        'https://farm9.staticflickr.com/8644/16517781789_6ed90c5678.jpg',
        'https://farm4.staticflickr.com/3937/15437546888_6a6f608e9c.jpg',
        'http://ftpmirror.your.org/pub/wikimedia/images/wikipedia/fi/e/ec/The_Catalyst.png',
        'http://orig07.deviantart.net/b7df/f/2010/265/b/4/pink_and_blue_clouds_500x500_by_prodigy42-d2zaii3.jpg',
        'http://www.neatorama.com/wp-content/uploads/2011/10/punch-500x500.jpg'
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
