import { Component, OnInit,  TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-cart-box',
  templateUrl: './cart-box.component.html',
  styleUrls: ['./cart-box.component.css']
})
export class CartBoxComponent implements OnInit {

    title = 'Create Your awesome model';

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) { }

    public openModal(template: TemplateRef<any>) {
        this.bsModalRef = this.modalService.show(template);
    }

  ngOnInit() {
  }

}
