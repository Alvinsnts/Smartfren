import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-addnewlocation',
  templateUrl: 'addnewlocation.html',
})
export class AddnewlocationPage implements OnInit {

  responses: any;
  productStatus: any;
  locationinfo= {"locationName": "", "locationPhone": "", "locationTime": "", "locationLong": "", "locationLat": "", "locationAddress": ""}

  constructor(private navCtrl: NavController, private navParams: NavParams, private authservice: AuthServiceProvider) {
  }

  ngOnInit() {
  }

  addLocation(){

    console.log(this.locationinfo);
    this.authservice.postdata('addlocation.php', this.locationinfo).subscribe(res =>{
  
      this.responses = res;
      console.log(this.responses.status);
      this.productStatus = this.responses.message;
      console.log(this.productStatus);
      console.log(this.responses);
        this.responses = JSON.stringify(this.responses);
        localStorage.setItem("locationdata", this.responses);
        this.navCtrl.push(HomePage);
    }, (err: HttpErrorResponse) => 
    {
      console.log(err.error);
      this.responses = err.error;
      alert(this.responses.message);
    });
  }

}