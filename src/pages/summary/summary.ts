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

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
    await  this.requestFinanceData();

  }

}