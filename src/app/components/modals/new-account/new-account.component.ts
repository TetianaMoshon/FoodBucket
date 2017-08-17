import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { User } from './user';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

	public title = 'Create Your Account';

  	constructor(public bsModalRef: BsModalRef) { }
    model = new User('', '', '', '');
	ngOnInit() {

	}

}
