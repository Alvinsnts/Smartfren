import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GraphPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
})
export class GraphPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  public doughnutChartLabels:string[] = ['Me', 'Myself', 'Irine'];
  public doughnutChartData:number[] = [1200, 1500, 2000];
  public doughnutChartType:string = 'doughnut';
  ionViewDidLoad() {
    console.log('ionViewDidLoad GraphPage');
  }

}