import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CommentsService } from '../../services/comments.service';

@Component({
    selector: 'app-disqus',
    templateUrl: './disqus.component.html',
    styleUrls: ['./disqus.component.css']
})
export class DisqusComponent implements OnInit {

    pageId;
    constructor(
        private router: Router,
        private commentsService: CommentsService
    ) { }

    ngOnInit() {
        this.pageId = this.router.url;
    }

    onComment(event) {
        const d = new Date();
        const datestring = this.formatDate(d);
        this.commentsService.addCommentInfo(event.id, event.text, datestring);
        localStorage.setItem('commentsInfo', JSON.stringify(this.commentsService.commentsInfoArray));
        localStorage.setItem('needToRetrieveInfo', JSON.stringify(true));
    }

    formatDate(date) {
        const formatedDate = date.getDate()  + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' at ' +
            date.getHours() + ':' + date.getMinutes();
        return formatedDate;
    }

}
