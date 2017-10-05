import { Injectable } from '@angular/core';

@Injectable()
export class CommentsService {

    commentsInfoArray = [];

    constructor() { }

    addCommentInfo(id, comment, date) {
        this.commentsInfoArray.push({comment_id: id, comment: comment, created_at: date});
    }

}
