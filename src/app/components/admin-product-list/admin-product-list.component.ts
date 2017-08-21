import { Ng2SmartTableComponent } from 'ng2-smart-table/ng2-smart-table.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {AdminProductListImageComponent} from './admin-product-list-image.component';

@Component({
    selector: 'app-admin-product-list',
    templateUrl: './admin-product-list.component.html',
    styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

    settings = {
        actions: {
            position: 'right',
            delete: 'true',
            columnTitle: ' ',
        },
        add: {
            addButtonContent: 'Add'
        },
        pager: {
            display: true,
            perPage: 5,
        },
        mode: 'external',
        columns: {
            id: {
                title: 'ID',
                filter: true,
                width: '10%',
            },
            name: {
                title: 'Name',
                filter: true,
                width: '30%',
            },
            image: {
                title: 'Image',
                width: '13%',
                type: 'custom',
                renderComponent: AdminProductListImageComponent,
                sort: false,
                filter: false,
            },
            section: {
                title: 'Section',
                width: '22%',
                filter: true,
            },
            active: {
                title: 'Active',
                width: '10%',
                filter: true,
            },
        },
    };

    data = [
        {
            id: 1,
            name: 'sushi',
            image: 'http://lorempixel.com/200/200/food/1',
            section: 'japan',
            active: true
        },
        {
            id: 2,
            name: 'sushi',
            image: 'http://lorempixel.com/200/200/food/2',
            section: 'japan',
            active: true
        },
        {
            id: 3,
            name: 'sushi',
            image: 'http://lorempixel.com/200/200/food/3',
            section: 'japan',
            active: true
        },
        {
            id: 4,
            name: 'sushi',
            image: 'http://lorempixel.com/200/200/food/4',
            section: 'japan',
            active: true
        },
        {
            id: 5,
            name: 'sushi',
            image: 'http://lorempixel.com/200/200/food/5',
            section: 'japan',
            active: true
        },
        {
            id: 6,
            name: 'sushi',
            image: 'http://lorempixel.com/200/200/food/6',
            section: 'japan',
            active: true
        },
        {
            id: 7,
            name: 'sushi',
            image: 'http://lorempixel.com/200/200/food/7',
            section: 'japan',
            active: true
        },
        {
            id: 8,
            name: 'sushi',
            image: 'http://lorempixel.com/200/200/food/8',
            section: 'japan',
            active: true
        },
        {
            id: 9,
            name: 'sushi',
            image: 'http://lorempixel.com/200/200/food/9',
            section: 'japan',
            active: true
        },

    ];

    constructor(private router: Router) { }

    ngOnInit() {
    }

    onEditClick(event, eventName: string): void {
        this.changeRoute('/admin/productlist/productpage');
    }

    onCreateClick(event, eventName: string): void {
        this.changeRoute('/admin/productlist/productpage');
    }

    changeRoute(routeValue) {
        this.router.navigateByUrl(routeValue);
    }
}
