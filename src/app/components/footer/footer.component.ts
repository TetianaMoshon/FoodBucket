import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {NewAccountComponent} from '../modals/new-account/new-account.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private modalService: BsModalService) {}
    public openNewAccount() {
        this.modalService.show(NewAccountComponent);
    }

  ngOnInit() {
  }

}
