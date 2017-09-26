import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {SearchHelpersService} from './services/search-helpers.service';

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
        private searchHelpersService: SearchHelpersService
    ) {}

    ngOnInit() {
        this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {

            if (event.path[0].getAttribute('class') !== null && event.path[0].getAttribute('class').includes('searchFamily')) {
                console.log(` Click on search result !`);
                this.searchHelpersService.hideSearchResults$.next(false);
            }  else {
                console.log(` Click on not even search result !`);
                this.searchHelpersService.hideSearchResults$.next(true);
            }


        });
    }



}
