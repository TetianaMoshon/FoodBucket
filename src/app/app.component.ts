import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {SearchHelpersService} from './services/search-helpers.service';
import {Router} from '@angular/router';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'app';

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private searchHelpersService: SearchHelpersService,
        public  _router: Router,
        public data: DataService
    ) {}

    ngOnInit() {
        this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
            this.searchHelpersService.hideSearchResults$.next(true);
        });

        if ( sessionStorage.getItem('currentUserId') && sessionStorage.getItem('currentUserFirstName')) {
            this.changeLogBtnText(false, JSON.parse(sessionStorage.getItem('currentUserFirstName')));
        }
    }

    public changeLogBtnText(message: boolean, btnText: string) {
        this.data.changeIsLogged(message);
        this.data.changeLogBtnText(btnText);
    }
}



}
