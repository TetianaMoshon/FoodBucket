import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../client/api/search.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    searcRes;
    searchInput$ = new Subject<string>();
    constructor(
        private searchService : SearchService
    ) { }

    ngOnInit() {
        this.searchInput$
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(inputData => this.search(inputData));
    }

    search(searchStr){
        if(searchStr.trim() != ''){
            this.searchService.searchForProducts(searchStr).subscribe(res => this.searcRes = res);
        } else {
            this.searcRes = '';
        }
    }

}
