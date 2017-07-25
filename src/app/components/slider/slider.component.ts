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
    ListOfImageLinks: string [] = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1hdKYANK4J5RkBdUDjSRcFrWm7Sn6DDULG_0Ezyv5mctjJf-lsw',
        'https://static.pexels.com/photos/20974/pexels-photo.jpg',
        'https://static.pexels.com/photos/60006/spring-tree-flowers-meadow-60006.jpeg',
        'http://i.imgur.com/9Z3QLx6.jpg?2',
        'https://www.planwallpaper.com/static/images/4-Nature-Wallpapers-2014-1_cDEviqY.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpjOXhAaqPzZjdlCpLj1M9BybIAmzKVO0WByaOJHwYF-_sajfM',
        'http://leanature.com/wp-content/uploads/2015/09/Slide_g%C3%A9n%C3%A9rique_Groupe.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMlF2DsYiZ4kCPXRMiKRyrFJW6hMGlNQGic1Ah5aw0oaYR6kWQ',
        'http://i51.tinypic.com/11jp3e9.jpg',
        'http://i.imgur.com/9Z3QLx6.jpg?2',
        'http://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/04/02/Pictures/conducted-collaboration-experiment-participants-environments-artificial-listened_5e43e23c-178a-11e7-9d7a-cd3db232b835.jpg',
        'https://www.natureindex.com/img/tables/2016-earth.jpg',
        'https://www.nature.org/cs/groups/webcontent/@web/@westvirginia/documents/media/panther-knob-1500x879.jpg'
    ];

    constructor() {}

    ngOnInit() {
        this.quantityOfPhotos = this.ListOfImageLinks.length;
        // calculate how many slides to create
        this.numberOfSlides = this.calculateHowManySlidersToDispay(this.quantityOfPhotos);
        // populate an array with an amount of items corresponding to the number of slides
        this.ArrayOfSlidesToDisplay = this.populateArray(this.numberOfSlides);
        }

    calculateHowManySlidersToDispay(quantityOfPhotos: number): number {
        return Math.ceil(quantityOfPhotos / this.numberOfPhotosInSliderRow);
    }

    populateArray(numberOfSlides) {
        const arr = [];
        for (let i = 0; i < numberOfSlides; i++) {
            arr.push(i);
        }
        return arr;
    }


}
