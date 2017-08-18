import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {LoginComponent} from '../modals/login/login.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private modalService: BsModalService) {}

  public openLoginModal() {
      this.modalService.show(LoginComponent);
  }

  ngOnInit() {
  }

}
