import { Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts';
import {Router} from '@angular/router';
import {StatisticsService} from '../../client/api/statistics.service';
import {ProductService} from '../../client/api/product.service';

@Component({
  selector: 'app-adminmain',
  templateUrl: './adminmain.component.html',
  styleUrls: ['./adminmain.component.css']
})
export class AdminMainComponent implements OnInit {
    public revenue;
    public orders;
    public allProducts;
    public location = '';
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public doughnutChartLabels: string[] = ['Tiramisu', 'Carbonara', 'Ratatouille'];
    public doughnutChartDataCategory: Array<number> = [10, 5, 10];
    public doughnutChartLabelsCategory: string[] = ['Bakery', 'Vegetarian', 'Seafood'];
    public doughnutChartData: Array<number> = [35, 45, 10];
    public doughnutChartType = 'doughnut';
    public colorsEmptyObject: Array<Color> = [{}];
    public datasetsCategory: any[] = [
        {
            data: this.doughnutChartDataCategory,
            backgroundColor: [
                '#E85013',
                '#64D678',
                '#19D2E8'
            ],
            hoverBackgroundColor: [
                '#BA400F',
                '#A6BA13',
                '#14A9BA'
            ]
        }];
    public datasets: any[] = [
        {
            data: this.doughnutChartData,
            backgroundColor: [
                '#E85013',
                '#64D678',
                '#19D2E8'
            ],
            hoverBackgroundColor: [
                '#BA400F',
                '#A6BA13',
                '#14A9BA'
            ]
        }];
    public lineChartData: Array <any> = [
        {data: [65, 59, 80, 98], label: 'Orders'},
        {data: [28, 35, 40, 55], label: 'Users'}
    ];
    public lineChartLabels: Array <any> = ['May', 'June', 'July', 'August'];
    public lineChartType = 'line';
    public lineChartLegend = true;
    public lineChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(148,159,177,0)',
            borderColor: '#BA400F',
            pointBackgroundColor: '#BA400F',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#BA400F'
        },
        {
            backgroundColor: 'rgba(77,83,96,0)',
            borderColor: '#51AB60',
            pointBackgroundColor: '#51AB60',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#64D678'
        }];
    constructor(private  _router: Router,
                private statService: StatisticsService,
                private productService: ProductService) {
        this.location = _router.url;
        console.log('Location of this', this.location);
    }

    ngOnInit() {
        this.statService.getRevenue().subscribe(res => {
            this.revenue = res['revenue'];
        });
        this.statService.getOrderStatistics().subscribe(res => {
            this.orders = res.totalOrders;
        });
  }

}
