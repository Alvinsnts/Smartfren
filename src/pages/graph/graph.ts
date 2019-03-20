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
      //this.makeGraph();

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
}

  makeGraph() {

      var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var labelList = [];
      var dataList = [];
      var expenseList = [];
      var salesList = [];
      var monthList = [];
      var i;
      console.log(this.financeList);

      var a = this.financeList;
      console.log(a);
      var num = a.length;
      
      for (i = 0; i < num; i++)
      {
          labelList.push(this.financeList[i].locationName);
          monthList.push(monthName[this.financeList[i].months - 1]);
          dataList.push(this.financeList[i].income);
          expenseList.push(this.financeList[i].expenses);
          salesList.push(this.financeList[i].sales);

      }

      this.barChart = new Chart(this.barCanvas.nativeElement, {

          type: 'bar',
          data: {
            labels: monthList,
              datasets: [{
                  label: 'Income',
                  data: dataList,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(170, 27, 151, 0.2)',
                      'rgba(255, 233, 0, 0.2)',
                      'rgba(255, 0, 0, 0.2)',
                      'rgba(0, 255, 0, 0.2)',
                      'rgba(0, 0, 255, 0.2)'
                                                                                                                                    
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(170, 27, 151, 0.2)',
                      'rgba(255, 233, 0, 0.2)',
                      'rgba(255, 0, 0, 0.2)',
                      'rgba(0, 255, 0, 0.2)',
                      'rgba(0, 0, 255, 0.2)'
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

          type: 'bar',
          data: {
            labels: monthList,
              datasets: [{
                  label: 'Expenses',
                  data: expenseList,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(170, 27, 151, 0.2)',
                    'rgba(255, 233, 0, 0.2)',
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(0, 255, 0, 0.2)',
                    'rgba(0, 0, 255, 0.2)'
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

        type: 'bar',
        data: {
          labels: monthList,
            datasets: [{
                label: 'Sales',
                data: salesList,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(170, 27, 151, 0.2)',
                    'rgba(255, 233, 0, 0.2)',
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(0, 255, 0, 0.2)',
                    'rgba(0, 0, 255, 0.2)'
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

  }


}