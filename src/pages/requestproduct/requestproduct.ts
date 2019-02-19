import { Component, OnInit, ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { HttpErrorResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SelectSearchableComponent } from 'ionic-select-searchable';

/**
 * Generated class for the RequestproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requestproduct',
  templateUrl: 'requestproduct.html',
})
export class RequestproductPage implements OnInit{

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
  request: any;
  requestList: any;
  requestStatus: any;
  requestinfo = {"locationName": "", "productname": "", "quantity": ""};
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
    this.authservice.getData('productlist.php').subscribe(data => {

      this.responseData = data;
      this.product = this.responseData;
      this.productList = this.product.records;
      console.log(this.productList);

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
  }
  requestProduct(){

    console.log(this.requestinfo);
    this.authservice.postdata('sendrequest.php', this.requestinfo).subscribe(res =>{
  
      this.responses = res;
      console.log(this.responses.status);
      this.requestStatus = this.responses.message;
      console.log(this.requestStatus);
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
