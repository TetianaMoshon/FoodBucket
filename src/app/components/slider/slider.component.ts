import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
    // quantity of photos available
    quantityOfPhotos: number;
    // quantity of slides
    ArrayOfSlidesToDisplay = [];
    // number of sliders
    numberOfSlides: number;
    // how many photos to see on the page at once
    numberOfPhotosInSliderRow = 3;
    test: number;

    constructor() { }

    ngOnInit() {
        this.quantityOfPhotos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].length;
        // calculate how many slides to create
        this.numberOfSlides = this.calculateHowManySlidersToDispay(this.quantityOfPhotos);
        // populate an array with an amount of items corresponding to the number of slides
        this.ArrayOfSlidesToDisplay = [1,2,3,4,5];
    }

    calculateHowManySlidersToDispay(quantityOfPhotos: number): number {
        return Math.ceil(quantityOfPhotos / this.numberOfPhotosInSliderRow);
    }

}
