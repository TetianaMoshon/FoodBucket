import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../services/pagination.service';
import { Product } from '../../models/product';

@Component({
    selector: 'app-productlist',
    templateUrl: './productlist.component.html',
    styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
    showHide: boolean;
    products: Product[] = [{
        'title': 'Bistro Shrimp Pasta',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'image': '/assets/images/bistro-shrimp-pasta.jpg',
        'routerLink': 'productpage'
    },
        {
            'title': 'Evelyns Favorite Pasta',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'image': '/assets/images/evelyns-favorite-pasta.jpg',
            'routerLink': 'productpage'
        },
        {
            'title': 'Fettuccini Alfredo',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'image': '/assets/images/fettuccini-alfredo.jpg',
            'routerLink': 'productpage'
        },
        {
            'title': 'Louisiana Chicken Pasta',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'image': '/assets/images/louisiana-chicken-pasta.jpg',
            'routerLink': 'productpage'
        },
        {
            'title': 'Pasta Carbonara',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'image': '/assets/images/pasta-carbonara.jpg',
            'routerLink': 'productpage'
        },
        {
            'title': 'Pasta wit Shrimp and Sausage',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'image': '/assets/images/pasta-with-shrimp-and-sausage.jpg',
            'routerLink': 'productpage'
        },
        {
            'title': 'Bistro Shrimp Pasta-2',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'image': '/assets/images/bistro-shrimp-pasta.jpg',
            'routerLink': 'productpage'
        },
        {
            'title': 'Evelyns Favorite Pasta-2',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'image': '/assets/images/evelyns-favorite-pasta.jpg',
            'routerLink': 'productpage'
        },
        {
            'title': 'Fettuccini Alfredo-2',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'image': '/assets/images/fettuccini-alfredo.jpg',
            'routerLink': 'productpage'
        },
        {
            'title': 'Louisiana Chicken Pasta-2',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'image': '/assets/images/louisiana-chicken-pasta.jpg',
            'routerLink': 'productpage'
        },
        {
            'title': 'Pasta Carbonara-2',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'image': '/assets/images/pasta-carbonara.jpg',
            'routerLink': 'productpage'
        },
        {
            'title': 'Pasta wit Shrimp and Sausage-2',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'image': '/assets/images/pasta-with-shrimp-and-sausage.jpg',
            'routerLink': 'productpage'
        }
    ];
    pager: any = {};
    pagedItems: any[];
    filter: Product = new Product();

    constructor(private pagerService: PagerService) {
        this.showHide = false;
    }

    ngOnInit() {
        this.setPage(1);
    }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        this.pager = this.pagerService.getPager(this.products.length, page);
        this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
