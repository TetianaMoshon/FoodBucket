import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CartCommunicationService {
    passedData = new Subject();
  constructor() { }

    getIdOfLoggedInUserFromSessionStorage() {
        if (JSON.parse(sessionStorage.getItem('currentUserId'))) {
            return JSON.parse(sessionStorage.getItem('currentUserId'));
        } else {
            return -1;
        }

    }

}
