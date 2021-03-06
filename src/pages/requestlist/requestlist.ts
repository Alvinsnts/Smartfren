import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
/**
 * Generated class for the RequestlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requestlist',
  templateUrl: 'requestlist.html',
})
export class RequestlistPage {

  responseData: any;
  requestList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authservice: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestlistPage');
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.authservice.getData('requestlist.php').subscribe(data => {

      this.responseData = data;
      this.requestList = this.responseData.records;
      console.log(this.requestList);

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
  }
}
