import { Component, OnInit, ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { HttpErrorResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SelectSearchableComponent } from 'ionic-select-searchable';

@Component({
  selector: 'page-updatestock',
  templateUrl: 'updatestock.html',
})
export class UpdatestockPage implements OnInit{

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
  updateStock(){

    console.log(this.stockinfo);
    this.authservice.postdata('updatestock.php', this.stockinfo).subscribe(res =>{
  
      this.responses = res;
      console.log(this.responses.status);
      this.stockStatus = this.responses.message;
      console.log(this.stockStatus);
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
