import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {

  responseData: any;
  responses: any;
  product: any;
  productList: any;
  productStatus: any;
  location: any;
  locationList: any;
  locationStatus: any;
  registerStatus: any;
  infosignup= {"username": "","email": "", "password": ""}
  
  constructor(private navCtrl: NavController, private navParams: NavParams, private authservice: AuthServiceProvider) {
  }

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
  signup(){

    console.log(this.infosignup);
    this.authservice.postdata('signup.php', this.infosignup).subscribe(res =>{

      this.responses = res;
      console.log(this.responses.status);
      this.registerStatus = this.responses.message;
      console.log(this.registerStatus);
      console.log(this.responses);
      if(this.registerStatus == "Register Success")
      {
        this.responses = JSON.stringify(this.responses);
        localStorage.setItem("registerdata", this.responses);
        alert("Register Success");
        this.navCtrl.push(HomePage);
      }
      else 
      {
        alert("Username already Exisst");
      }
    }, (err: HttpErrorResponse) => 
    {
      console.log(err.error);
      this.responses = err.error;
      alert(this.responses.message);
    });
  }

}
