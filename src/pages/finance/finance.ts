import { Component, OnInit, ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { HttpErrorResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SelectSearchableComponent } from 'ionic-select-searchable';

/**
 * Generated class for the FinancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finance',
  templateUrl: 'finance.html',
})
export class FinancePage {
  @ViewChild('myselect') selectComponent: SelectSearchableComponent;
  responseData: any;
  responses: any;
  location: any;
  locationList: any;
  locationStatus: any;
  months: any;
  monthslist: any;
  monthsStatus: any;
  finance: any;
  financeList: any;
  financeStatus: any;
  financeinfo= {"locationName": "", "months": "", "years:": "", "income": "", "expenses": "", "sales": ""};
  constructor(private navCtrl: NavController, private navParams: NavParams, private authservice: AuthServiceProvider, private toastCtrl: ToastController) {}

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
  }

  updateInfo(){

    console.log(this.financeinfo);
    this.authservice.postdata('finance.php', this.financeinfo).subscribe(res =>{
  
      this.responses = res;
      console.log(this.responses.status);
      this.financeStatus = this.responses.message;
      console.log(this.financeStatus);
      console.log(this.responses);
        this.responses = JSON.stringify(this.responses);
        localStorage.setItem("productdata", this.responses);
        this.navCtrl.push(HomePage);
        
    }, (err: HttpErrorResponse) => 
    {
      console.log(err.error);
      this.responses = err.error;
      alert(this.responses.message);
    });
    
  }


}