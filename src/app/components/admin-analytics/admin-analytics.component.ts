import { Component, OnInit } from '@angular/core';
import {StatisticsService} from '../../client/api/statistics.service';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})

export class AdminAnalyticsComponent implements OnInit {

    // Charts
    totalOrders;
    totalUsers;
    completedOrders;
    revenue;
    promotionalProducts;
    nonpromotionalProducts;
    fishProducts;
    meatProducts;
    vegeterianProducts;
    doughnutProductsData: number[];
    // Doughnut
    public dougnutProductsLabels: string[]= ['Promotion', 'Not promotion'];
    public doughnutType = 'doughnut';
    public doughnutColors: any[] = [
        {
            backgroundColor: ['#19D2E8', '#64D678', '#E85013'],
            borderColor: '#fff',
            hoverBackgroundColor: ['#1be7ff', '#6eeb83', '#ff5714'],
            hoverBorderColor: '#fff'
        }];

    // Gender Doughnut
    public doughnutProductsLabels: string[] = ['Promotional', 'Not promotional'];
    // Category Doughnut
    public doughnutCategoryLabels: string[] = ['Fish', 'Meat', 'Vegetarian'];
    public doughnutCategoryData: number[] = [350, 450, 100];

    // Bar
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Usual Orders'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Promo Orders'}
    ];
    public barChartColors: any[] = [
        { backgroundColor: '#19D2E8', borderColor: '#19D2E8', hoverBackgroundColor: '#1be7ff', hoverBorderColor: '#14A9BA'},
        { backgroundColor: '#E85013', borderColor: '#E85013', hoverBackgroundColor: '#ff5714', hoverBorderColor: '#BA400F'}];

    constructor(private statService: StatisticsService) {
    }

    ngOnInit() {
        this.statService.getOrderStatistics().subscribe(res => {
            this.totalOrders = res.totalOrders;
        });
        this.statService.getUsersStatistics().subscribe(res => {
            this.totalUsers = res.totalUsers;
        });
        this.statService.getCompletedOrdersStatistics().subscribe(res => {
            this.completedOrders = res.completedOrders;
        });
        this.statService.getRevenue().subscribe(res => {
            this.revenue = res['revenue'];
        });
        this.statService.getPromotionProductsCount().subscribe(res => {
            this.promotionalProducts = res.promotionalProducts;
        });
        this.statService.getNonpromotionalProducts().subscribe(res => {
            this.nonpromotionalProducts = res.nonpromotionalProducts;
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
    }
}

