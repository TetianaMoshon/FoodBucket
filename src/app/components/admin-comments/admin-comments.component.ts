import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Ng2SmartTableComponent } from 'ng2-smart-table/ng2-smart-table.component';

@Component({
    selector: 'app-admin-comments',
    templateUrl: './admin-comments.component.html',
    styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {

    arrayOfCommentsInfo: any[] = [];

    settings = {
        actions: {
            position: 'right',
            delete: true,
            edit: false,
            add: false,
            columnTitle: ' ',
        },
        hideSubHeader: true,
        pager: {
            display: true,
            perPage: 5,
        },
        columns: {
            comment_id: {
                title: `Disqus Comment's ID`,
                sort: false,
                filter: false,
            },
            comment: {
                title: 'Comment',
                width: '60%',
                sort: false,
                filter: false,
            },
            created_at: {
                title: 'Created At',
                width: '22%',
                sort: false,
                filter: false,
            },
        },
    };

    constructor(
        private commentsService: CommentsService
    ) {}

    ngOnInit() {
        this.arrayOfCommentsInfo = JSON.parse(localStorage.getItem('commentsInfo'));
        this.fetchCommentsInfo();
    }

    fetchCommentsInfo() {
        setInterval(() => {
            if (JSON.parse(localStorage.getItem('needToRetrieveInfo'))) {
                this.arrayOfCommentsInfo = JSON.parse(localStorage.getItem('commentsInfo'));
                localStorage.setItem('needToRetrieveInfo', JSON.stringify(false));
            }
           }, 2000);
    }

}

