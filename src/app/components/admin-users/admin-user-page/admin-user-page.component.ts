import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../../client/api/user.service';


@Component({
  selector: 'app-admin-user-page',
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.css']
})
export class AdminUserPageComponent implements OnInit {
  constructor(
      protected userService: UserService,
      protected route: ActivatedRoute) {
  }

  ngOnInit() {
      console.log(this.route.url);
  }

}
