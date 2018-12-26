import { Component, OnInit } from '@angular/core';
import { HomePage } from '../home/home';
import { HttpErrorResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login implements OnInit {
  infologin = {"username": "", "password": ""} ;
  responses: any;
  loginstatus: any;
  constructor(private navCtrl: NavController, private navParams: NavParams, private authservice: AuthServiceProvider) {

  }
  ngOnInit() {
  }

  login()
  {
    console.log(this.infologin);
    this.authservice.postdata('login.php', this.infologin).subscribe(res => {
      this.responses = res;
      console.log(this.responses.status);
      this.loginstatus = this.responses.message;
      console.log(this.loginstatus);
      console.log(this.responses);
        this.responses = JSON.stringify(this.responses);
        localStorage.setItem("infologin", this.responses);
        alert("Login Success");
        this.navCtrl.push(HomePage);
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responses = err.error;
      alert(this.responses.message);
    });
  }

}