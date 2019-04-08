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
 * Generated class for the SummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

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
  finance: any;
  financeList: any;
  financeStatus: any;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  summary: any;
  summaryList: any;
  summaryStatus: any;
  summaryinfo= { "months": "", "years": "", "locationID": ""};
  loginInfo: {"username" : string, "locationID": ""};
  
  constructor(private navCtrl: NavController, private navParams: NavParams, private authservice: AuthServiceProvider) {}

    ngOnInit() {

    this.authservice.getData('locationlist.php').subscribe(data => {

      this.responseData = data;
      this.location = this.responseData;
      this.locationList = this.location.records;
      console.log(this.locationList);

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });

    this.loginInfo = JSON.parse(localStorage.getItem('infologin'));
    console.log(this.loginInfo);
    console.log(this.loginInfo.username);

}

  async requestFinanceData(){
    var abc = this.loginInfo.username;
    if ( abc != "admin"){
      this.summaryinfo.locationID = this.loginInfo.locationID ;
      
    }

    var month = this.summaryinfo.months;
    var year = this.summaryinfo.years;
    let url = "summarylist.php?month=" + month + "&year=" + year;
    console.log(url);
    this.authservice.getData(url).subscribe(data => {

      this.responseData =  data;
      this.summary = this.responseData;
      this.summaryList = this.summary.records;
      console.log(this.summaryList);
      this.generategraph();


    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });

    
  }

  async makeGraph() {
    this.authservice.getData('summarylist.php').subscribe(data => {

      this.responseData = data;
      this.summaryList = this.responseData.records;
      console.log(this.summaryList);

    });
    await  this.requestFinanceData();

  }

  async generategraph() {
    var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var labelList = [];
      var dataList = [];
      var expenseList = [];
      var salesList = [];
      var monthList = [];
      var i;
      console.log(this.summaryList);

      var a = this.summaryList;
      console.log(a);
      var num = a.length;
      
      for (i = 0; i < num; i++)
      {
          labelList.push(this.summaryList[i].locationName);
          monthList.push(monthName[this.summaryList[i].months - 1]);
          dataList.push(this.summaryList[i].income);
          expenseList.push(this.summaryList[i].expenses);
          salesList.push(this.summaryList[i].sales);

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
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(152, 66, 244, 0.2)',
                    'rgba(65, 244, 214, 0.2)',
                    'rgba(154, 244, 65, 0.2)',
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
                    "#FFCE56",
                    "#9842f4",
                    "#41f4d6",
                    "#9af441",
                    "#ff0000",
                    "#00ff00",
                    "#0000ff"
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
            labels: labelList,
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
                    'rgba(152, 66, 244, 0.2)',
                    'rgba(65, 244, 214, 0.2)',
                    'rgba(154, 244, 65, 0.2)',
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
                      "#FFCE56",
                      "#9842f4",
                      "#41f4d6",
                      "#9af441",
                      "#ff0000",
                      "#00ff00",
                      "#0000ff"
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

      this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: 'bar',
        data: {
          labels: labelList,
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
                  'rgba(152, 66, 244, 0.2)',
                  'rgba(65, 244, 214, 0.2)',
                  'rgba(154, 244, 65, 0.2)',
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
                  "#FFCE56",
                  "#9842f4",
                  "#41f4d6",
                  "#9af441",
                  "#ff0000",
                  "#00ff00",
                  "#0000ff"
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
  }

}