
import { Component, OnInit } from '@angular/core';
import { HomePage } from '../home/home';
import { HttpErrorResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-updatestock',
  templateUrl: 'updatestock.html',
})
export class UpdatestockPage {

  responseData: any;
  productDetailInfo: any;
  product: any;
  productList: any;
  // tslint:disable-next-line:quotemark
  input = { "stock": "", "productDetailId" : "" };
  productinfo= {"productID" : "", "productName": "", "productPrice": "", "productType": "", "productDetail": "", "productQuantity": ""}
  constructor(private navCtrl: NavController, private navParams: NavParams, private authservice: AuthServiceProvider) {}

  ngOnInit() {

  }

  getProductInfo(productId) {
    const path = 'getproductinfo.php?id=' + productId;
    console.log(path);
    this.authservice.getData(path).subscribe(data => {

      this.responseData = data;
      console.log(this.responseData);
      this.productDetailInfo = this.responseData.records;
      console.log(this.productDetailInfo);
      console.log(this.productDetailInfo[0].size);

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });

  }

  updateStock() {
    this.input.productDetailId = this.productDetailInfo[0].productDetailId;
    this.authservice.postdata('updatestock.php', this.input).subscribe(data => {

      this.responseData = data;
      alert(this.responseData.message);
      this.navCtrl.push(HomePage);
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
  }

}
