
import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../client/api/search.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {SearchHelpersService} from '../../services/search-helpers.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    searcRes;
    searchInput$ = new Subject<string>();
    hide: boolean;
    constructor(
        private searchService: SearchService,
        private searchHelpersService: SearchHelpersService
    ) { }

    ngOnInit() {
        this.hide = false;
        this.searchInput$
            .debounceTime(350)
            .distinctUntilChanged()
            .subscribe(inputData => this.search(inputData));
        this.searchHelpersService.hideSearchResults$
            .debounceTime(350)
            .subscribe(hideOrNot => {
                this.hide = hideOrNot;
                if (hideOrNot) {
                    this.searcRes = '';
                }

            });
    }

    search(searchStr) {
        if (searchStr !== undefined && searchStr.trim() !== '') {
            const requestedStr = searchStr.trim();
            this.searchService.searchForProducts(requestedStr).subscribe(res => this.searcRes = res);
        } else {
            this.searcRes = '';
        }
    }

}
