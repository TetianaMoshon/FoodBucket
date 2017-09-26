import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class ImageService {
    constructor(
        private http: Http
    ) { }

    uploadImageByEntityId(id, file, methodName, entityName) {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        const headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        // headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({ headers: headers });
        const request = (methodName.toLowerCase() === 'put') ?
            this.http.put(`/api/${entityName}/${id}/image`, formData, options) :
            this.http.post(`/api/${entityName}/${id}/image`, formData, options);

        request.map(res => res.json()).catch(error => Observable.throw(error))
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            );
    }
}
