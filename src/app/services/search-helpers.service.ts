import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class SearchHelpersService {
    hideSearchResults$ = new Subject<boolean>();

  constructor() { }

}
