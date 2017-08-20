import { Component, OnInit } from '@angular/core';
import { NguiMapComponent } from '@ngui/map';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  title = 'Our office';
  email = 'foodbucket@gmail.com';
  phone = '8-888-888-888';
  time = '8.00-22.00';

  lat = 50.454660;
  lng = 30.52380;

    constructor() { }

    ngOnInit() {
    }
}
