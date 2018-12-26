import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from './product.model';
import { ProductServiceProvider } from '../../providers/product-service/product-service';

/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {

  images = {"imagePath" : "http://smartfrenmapping.xyz/api/uploads/", "convertedImagePath" : "http://smartfrenmapping.xyz/api/uploads/"};
  responses: any;
  productStatus: any;
  productinfo= {"productname": "", "productprice": "", "producttype": "", "productdetail": ""}
  product: Product;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductServiceProvider
  ) {
    this.product = new Product();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
  }

  addProduct() {
    const data = {
      id: '001',
      productName: this.product.productName, 
      productPrice: this.product.productPrice,
      productType: this.product.productType,
      productDetail: this.product.productDetail
    }

    this.productService.saveProduct(data).subscribe(
      response => {
        console.log(response);
      }
    )
  }
  
  getProduct() {
    this.productService.getProduct().subscribe(
      response => {
        console.log(response);
      }
    ) 
  }

}
