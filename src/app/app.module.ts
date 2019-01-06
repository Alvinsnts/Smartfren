import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import { Login } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AddproductPage } from '../pages/addproduct/addproduct';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { AddnewlocationPage } from '../pages/addnewlocation/addnewlocation';

@NgModule({
  declarations: [
    MyApp,
    Login,
    SignupPage,
    AddproductPage,
    AddnewlocationPage,
    HomePage
  ],
  imports: [
    BrowserModule, HttpModule, HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    SignupPage,
    AddproductPage,
    AddnewlocationPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ProductServiceProvider,
  ]
})
export class AppModule { }
