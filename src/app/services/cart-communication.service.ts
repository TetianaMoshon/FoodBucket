import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CartCommunicationService {
    passedData = new Subject();
  constructor() { }

    getIdOfLoggedInUserFromSessionStorage() {
        if (JSON.parse(localStorage.getItem('currentUser'))) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            return user.userId;
        } else {
            return;
        }
    }

}
