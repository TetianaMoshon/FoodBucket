import { Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts';
import {Router} from '@angular/router';
import {StatisticsService} from '../../client/api/statistics.service';
import {ProductService} from '../../client/api/product.service';
import {IngredientService} from '../../client/api/ingredient.service';

@Component({
  selector: 'app-adminmain',
  templateUrl: './adminmain.component.html',
  styleUrls: ['./adminmain.component.css']
})
export class AdminMainComponent implements OnInit {
    public revenue;
    meatProducts;
    fishProducts;
    vegeterianProducts;
    totalUsers;
    public orders;
    public allProducts;
    public location = '';
    public ingredientsForStats;
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public doughnutColors: any[] = [
        {
            backgroundColor: ['#19D2E8', '#64D678', '#E85013'],
            borderColor: '#fff',
            hoverBackgroundColor: ['#1be7ff', '#6eeb83', '#ff5714'],
            hoverBorderColor: '#fff'
        }];
    public pieChartLabels: string[] = ['Users', 'Orders'];
    public pieChartType = 'pie';
    public pieChartColors: any[] = [
        {
            backgroundColor: ['#19D2E8', '#64D678'],
            borderColor: '#fff',
            hoverBackgroundColor: ['#1be7ff', '#6eeb83'],
            hoverBorderColor: '#fff',
        }
    ];
    public doughnutChartLabels: string[] = ['Fish', 'Meat', 'Vegeterian'];
    public doughnutChartDataCategory: Array<number> = [10, 5, 10];
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
                private ingrService: IngredientService) {
        this.location = _router.url;
    }

    ngOnInit() {
        this.statService.getRevenue().subscribe(res => {
            this.revenue = res['revenue'];
        });
        this.statService.getUsersStatistics().subscribe(res => {
            this.totalUsers = res.totalUsers;
        });
        this.statService.getOrderStatistics().subscribe(res => {
            this.orders = res.totalOrders;
        });
        this.statService.getCategoriesStatistics('Fish').subscribe(res => {
            this.fishProducts = res['queryProducts'];
        });
        this.statService.getCategoriesStatistics('Meat').subscribe(res => {
            this.meatProducts = res['queryProducts'];
        });
        this.statService.getCategoriesStatistics('Vegeterian').subscribe(res => {
            this.vegeterianProducts = res['queryProducts'];
        });
        this.ingrService.getAllIngredients(0, 5, 'asc', 'quantity').subscribe(res => {
            this.ingredientsForStats = res;
            console.log(res);
        });
  }

}
