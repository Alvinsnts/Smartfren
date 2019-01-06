import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const apiUrl = 'http://smartfrenmapping.xyz/api/product';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postdata(url, credential){
    return this.http.post(`${apiUrl}/${url}`, JSON.stringify(credential), {});
  }
  uploadImage(url,credentials){
    return this.http.post(`${apiUrl}/${url}`, credentials, {});
  }
  getData(url){
    return this.http.get(`${apiUrl}/${url}`);
  }

}
