import { Component, OnInit } from '@angular/core';
import { NguiMapComponent } from '@ngui/map';

import { Massage } from './massage';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  title = 'Our office';
  our_email = 'foodbucket@gmail.com';
  phone = '8-888-888-888';
  time = '8.00-22.00';
  address = 'Degtyarivska St., 33B';
  city = 'Kiev';
  index = '02000';
  lat = 50.454660;
  lng = 30.52380;

    constructor() { }

    ngOnInit() {
    }
}
