import { Component, OnInit } from '@angular/core';
import {Color} from "ng2-charts";

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})

export class AdminAnalyticsComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    //Charts

    //Chart Orders
    public chartOrdersData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Total'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Complited'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Canceled'}
    ];
    public chartOrdersLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public chartOrdersOptions:any = {
        responsive: true
    };
    public chartOrdersColors:Array<any> = [
        { //Total
            backgroundColor: 'rgba(27, 231, 255,0.2)',
            borderColor: '#14a9ba',
            pointBackgroundColor: '#14a9ba',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#14a9ba'
        },
        { // Complited
            backgroundColor: 'rgba(110, 235, 131, 0.2)',
            borderColor: '#51ab60',
            pointBackgroundColor: '#51ab60',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#51ab60'
        },
        { // Canceled
            backgroundColor: 'rgba(255, 87, 20, 0.2)',
            borderColor: '#e85013',
            pointBackgroundColor: '#e85013',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#e85013'
        }
    ];
    public chartOrdersLegend:boolean = true;
    public chartOrdersType:string = 'line';

    //Chart Cash
    public chartCashData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Total'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Promo'}
    ];
    public chartCashLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public chartCashOptions:any = {
        responsive: true
    };
    public chartCashColors:Array<any> = [
        { //Total
            backgroundColor: 'rgba(27, 231, 255,0.2)',
            borderColor: '#14a9ba',
            pointBackgroundColor: '#14a9ba',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#14a9ba'
        },
        { // Complited
            backgroundColor: 'rgba(110, 235, 131, 0.2)',
            borderColor: '#51ab60',
            pointBackgroundColor: '#51ab60',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#51ab60'
        }
    ];
    public chartCashLegend:boolean = true;
    public chartCashType:string = 'line';

    // Doughnut
    public doughnutType:string = 'doughnut';
    public doughnutColors: any[] = [
        {
            backgroundColor:["#19D2E8", "#64D678", "#E85013"],
            borderColor: "#fff",
            hoverBackgroundColor: ["#1be7ff", "#6eeb83", "#ff5714"],
            hoverBorderColor: "#fff"
        }];

    //Gender Doughnut
    public doughnutGenderData:number[] = [350, 450];
    public doughnutGenderLabels:string[] = ['Male', 'Female'];

    //Category Doughnut
    public doughnutCategoryLabels:string[] = ['Fish', 'Meat', 'Vegetarian'];
    public doughnutCategoryData:number[] = [350, 450, 100];

    //bar
    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Usual Orders'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Promo Orders'}
    ];
    public barChartColors: any[] = [
        { backgroundColor: '#19D2E8', borderColor:"#19D2E8", hoverBackgroundColor: '#1be7ff', hoverBorderColor: '#14A9BA'},
        { backgroundColor: '#E85013', borderColor:"#E85013", hoverBackgroundColor: '#ff5714', hoverBorderColor: '#BA400F'}];
}

