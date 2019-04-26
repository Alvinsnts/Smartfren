import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Login } from '../pages/login/login'
import { HomePage } from '../pages/home/home';
import { AddproductPage } from '../pages/addproduct/addproduct';
import { AddnewlocationPage } from '../pages/addnewlocation/addnewlocation';
import { CheckstockPage } from '../pages/checkstock/checkstock';
import { FinancePage } from '../pages/finance/finance';
import { GraphPage } from '../pages/graph/graph';
import { RequestlistPage } from '../pages/requestlist/requestlist';
import { SummaryPage } from '../pages/summary/summary';
import { SignupPage } from '../pages/signup/signup';
import { UpdatestockPage } from '../pages/updatestock/updatestock';
import { RequestproductPage } from '../pages/requestproduct/requestproduct';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  loginInfo: {"username" : any};
  rootPage = Login;
  pages: Array<{title: string, component: any}>;


  constructor(platform: Platform, public SplashScreen: SplashScreen, public StatusBar: StatusBar, public app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.StatusBar.styleDefault();
      this.SplashScreen.hide();
    });
  }
//   ngOnInit() {

//     this.loginInfo = JSON.parse(localStorage.getItem('infologin'));
//     console.log(this.loginInfo);
//     console.log(this.loginInfo.username);
//     if(this.loginInfo.username == 'admin')
//     {
//       this.pages = [
//         { title: 'Home', component: HomePage },
//         { title: 'Add Product', component: AddproductPage },
//         { title: 'Add Location', component: AddnewlocationPage },
//         { title: 'Check Stock', component: CheckstockPage },
//         { title: 'Finance', component: FinancePage },
//         { title: 'Report', component: GraphPage },
//         { title: 'Request List', component: RequestlistPage },
//         { title: 'Summary', component: SummaryPage },
//         { title: 'Signup', component: SignupPage }
//       ];
//     }
//     else
//     {
//       this.pages = [
//         { title: 'Home', component: HomePage },
//         { title: 'Update stock', component: UpdatestockPage },
//         { title: 'Check Stock', component: UpdatestockPage },
//         { title: 'Finance', component: FinancePage },
//         { title: 'Report', component: GraphPage },
//         { title: 'Request', component: RequestproductPage },
//         { title: 'Request List', component: RequestlistPage },
//       ];
//     }

//   }
//   openPage(page) {
//     // Reset the content nav to have just this page
//     // we wouldn't want the back button to show in this scenario
//     this.nav.setRoot(page.component);
//   }
//   logout(){
//     // Remove API token 
//     localStorage.removeItem('logininfo')
//     const root = this.app.getRootNav();
//     root.popToRoot();
//   }

//   login(){
//     this.nav.push(Login);
//     }

//   signup(){
//     this.nav.push(SignupPage);
//     }

//   addproduct(){
//     this.nav.push(AddproductPage);
//     }

//   addlocation(){
//     this.nav.push(AddnewlocationPage);
//     }
    
//   graph(){
//     this.nav.push(GraphPage);
//     }

//   updatestock(){
//     this.nav.push(UpdatestockPage);
//     }

//   finance(){
//     this.nav.push(FinancePage);
//     }

//   requestproduct(){
//     this.nav.push(RequestproductPage);
//     }

//   requestlist(){
//     this.nav.push(RequestlistPage);
//     }
    
//   summary(){
//     this.nav.push(SummaryPage);
//     }

//   checkstock(){
//     this.nav.push(CheckstockPage);
//     }
 }