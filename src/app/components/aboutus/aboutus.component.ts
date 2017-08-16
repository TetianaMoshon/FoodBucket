import { Component, OnInit } from '@angular/core';
import { NguiMapComponent } from '@ngui/map';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title: string = 'Our office';
  email:string = "foodbucket@gmail.com";
  phone:string = "8-888-888-888";
  time:string = "8.00-22.00";

  lat: number = 50.454660;
  lng: number = 30.52380;

}
