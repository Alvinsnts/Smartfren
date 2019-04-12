import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckstockPage } from './checkstock';

@NgModule({
  declarations: [
    CheckstockPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckstockPage),
  ],
})
export class CheckstockPageModule {}
