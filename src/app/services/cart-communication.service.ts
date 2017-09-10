import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CartCommunicationService {
    passedData = new Subject();
  constructor() { }

}
