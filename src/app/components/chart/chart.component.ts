import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {Chart , registerables} from 'chart.js';
import { CurrencyExchangeService } from 'src/app/shared/service/currency-exchange.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public chart: any;

  @Input() labels : string [] = [];
  @Input() values : number [] = []
  MyChart!: any;

  @ViewChild('myChart') private myChart: any

  constructor(public currencyExchangeService: CurrencyExchangeService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    this.createChart();
  }


  createChart(){
    const myChart : any = document.getElementById('myChart');
    this.chart = new Chart(myChart, {
      type: 'line', 

      data: { // values on X-Axis
        labels: this.labels,
	       datasets: [
          {
            label: "Rates",
            data: this.values,
            backgroundColor: '#009688'
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }


}
