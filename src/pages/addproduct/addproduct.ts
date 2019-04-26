import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage implements OnInit {

  responses: any;
  productStatus: any;
  productinfo= {"productName": "", "productPrice": "", "productType": "", "productDetail": ""}

  constructor(private navCtrl: NavController, private navParams: NavParams, private authservice: AuthServiceProvider) {
  }

  ngOnInit() {
  }

  addProduct(){

    console.log(this.productinfo);
    this.authservice.postdata('addproduct.php', this.productinfo).subscribe(res =>{
  
      this.responses = res;
      console.log(this.responses.status);
      this.productStatus = this.responses.message;
      console.log(this.productStatus);
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
  
  back(){
    this.navCtrl.push(HomePage);
    }
}