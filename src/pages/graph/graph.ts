import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { OnInit } from '@angular/core';
import { HomePage } from '../home/home';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SelectSearchableComponent } from 'ionic-select-searchable';


/**
 * Generated class for the GraphPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
})
export class GraphPage implements OnInit {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('myselect') selectComponent: SelectSearchableComponent;
  responseData: any;
  responses: any;
  product: any;
  productList: any;
  productStatus: any;
  location: any;
  locationList: any;
  locationStatus: any;
  stock: any;
  stockList: any;
  stockStatus: any;
  stockinfo = {"locationName": "", "productname": "", "quantity": ""};
  finance; any;
  financeList: any;
  financeStatus: any;
  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private authservice: AuthServiceProvider) {}

    ngOnInit() {
    this.authservice.getData('financelist.php').subscribe(data => {

      this.responseData = data;
      this.finance = this.responseData;
      this.financeList = this.finance.records;
      console.log(this.financeList);
      this.makeGraph();

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
}

  makeGraph() {
      var labelList = [];
      var dataList = [];
      var i;
      console.log(this.financeList);
      
      var a = this.financeList;
      console.log(a);
      var num = a.length;
      
      for (i = 0; i < num; i++)
      {
          labelList.push(this.financeList[i].locationName);
          dataList.push(this.financeList[i].income);

      }

      this.barChart = new Chart(this.barCanvas.nativeElement, {

          type: 'bar',
          data: {
              labels: labelList,
              datasets: [{
                  label: 'Income',
                  data: dataList,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }

      });

      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

          type: 'doughnut',
          data: {
              labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
              datasets: [{
                  label: '# of Votes',
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                  ]
              }]
          }

      });

      this.lineChart = new Chart(this.lineCanvas.nativeElement, {

          type: 'line',
          data: {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [
                  {
                      label: "My First dataset",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: [65, 59, 80, 81, 56, 55, 40],
                      spanGaps: false,
                  }
              ]
          }

      });

  }


}