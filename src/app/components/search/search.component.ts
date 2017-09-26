
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
    constructor(
        private searchService: SearchService,
        private searchHelpersService: SearchHelpersService
    ) { }

    ngOnInit() {
        this.searchInput$
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(inputData => this.search(inputData));
        this.searchHelpersService.hideSearchResults$
            .debounceTime(400)
            .subscribe(hideOrNot => {
                if (hideOrNot) {
                    this.searcRes = '';
                }

            });
    }

    search(searchStr) {
        if (searchStr !== undefined && searchStr.trim() !== '') {
            this.searchService.searchForProducts(searchStr).subscribe(res => this.searcRes = res);
        } else {
            this.searcRes = '';
        }
    }

}
