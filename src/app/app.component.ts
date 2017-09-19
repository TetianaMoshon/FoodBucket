import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(public  _router: Router, public data: DataService) {
    }
    ngOnInit() {
        localStorage.setItem('showAPhrase', JSON.stringify(true));
        localStorage.setItem('cartContentObjCreated', JSON.stringify(false));
        if ( sessionStorage.getItem('currentUserId') && sessionStorage.getItem('currentUserFirstName')) {
        this.changeLogBtnText(false, JSON.parse(sessionStorage.getItem('currentUserFirstName')));
        }
    }
    public changeLogBtnText(message: boolean, btnText: string) {
        this.data.changeIsLogged(message);
        this.data.changeLogBtnText(btnText);
    }
}
