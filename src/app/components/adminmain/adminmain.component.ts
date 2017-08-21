import { Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-adminmain',
  templateUrl: './adminmain.component.html',
  styleUrls: ['./adminmain.component.css']
})
export class AdminMainComponent implements OnInit {
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public doughnutChartLabels: string[] = ['Pastas', 'Apple', 'Salad'];
    public doughnutChartType = 'doughnut';
    public doughnutChartData: Array<number> = [35, 45, 10];
    public colorsEmptyObject: Array<Color> = [{}];
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
    constructor() { }

    ngOnInit() {
  }

}
