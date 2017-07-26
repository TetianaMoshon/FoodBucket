import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

	public title = 'Login to Foodbucket';
  	constructor(public bsModalRef: BsModalRef) { }

  	
	ngOnInit() {

	}

}
