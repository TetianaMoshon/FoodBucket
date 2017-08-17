import { Component, OnInit } from '@angular/core';
import { NguiMapComponent } from '@ngui/map';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
    isVisibleFull: boolean = false;
    isVisible: boolean = true;
    title: string = 'Our office';
    lat: number = 50.454660;
    lng: number = 30.52380;

  constructor() { }

  ngOnInit() {
  }

  openFullMap() {
      this.isVisibleFull = true;
      this.isVisible = false;
  }
  closeFullMap() {
      this.isVisibleFull = false;
      this.isVisible = true;
  }
}
