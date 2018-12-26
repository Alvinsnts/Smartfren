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

  responses: any;
  registerStatus: any;
  infosignup= {"username": "","email": "", "password": "", "role": ""}
  
  constructor(private navCtrl: NavController, private navParams: NavParams, private authservice: AuthServiceProvider) {
  }

  ngOnInit() {
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
