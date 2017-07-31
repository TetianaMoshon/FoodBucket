import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import  {LoginComponent} from "../modals/login/login.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private modalService: BsModalService) { }

  
    public openLoginModal() {
        this.modalService.show(LoginComponent);
    }
  ngOnInit() {
  }

}
