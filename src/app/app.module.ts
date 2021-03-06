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
import { ChartsModule } from 'ng2-charts';
import { GraphPage } from '../pages/graph/graph';
import { UpdatestockPage } from '../pages/updatestock/updatestock';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { FinancePage } from '../pages/finance/finance';
import { RequestproductPage } from '../pages/requestproduct/requestproduct';
import { RequestlistPage } from '../pages/requestlist/requestlist';
import { SummaryPage } from '../pages/summary/summary';
import { CheckstockPage } from '../pages/checkstock/checkstock';


@NgModule({
  declarations: [
    MyApp,
    Login,
    SignupPage,
    AddproductPage,
    AddnewlocationPage,
    HomePage,
    GraphPage,
    UpdatestockPage,
    FinancePage,
    RequestproductPage,
    RequestlistPage,
    SummaryPage,
    CheckstockPage
  ],
  imports: [
    BrowserModule, HttpModule, HttpClientModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    SelectSearchableModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    SignupPage,
    AddproductPage,
    AddnewlocationPage,
    HomePage,
    GraphPage,
    UpdatestockPage,
    FinancePage,
    RequestproductPage,
    RequestlistPage,
    SummaryPage,
    CheckstockPage
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
