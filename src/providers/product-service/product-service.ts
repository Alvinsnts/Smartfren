import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_PRODUCT_URL, SAVE_PRODUCT_URL } from '../../shared/constant';

/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductServiceProvider {

  private getProductUrl = GET_PRODUCT_URL;
  private saveProductUrl = SAVE_PRODUCT_URL;

  constructor(public http: HttpClient) {
    console.log('Hello ProductServiceProvider Provider');
  }

  getProduct() {
    return this.http.get(this.getProductUrl);
  }

  saveProduct(data){
    return this.http.post(this.saveProductUrl, data);
  }

}
