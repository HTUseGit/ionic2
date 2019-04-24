import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-my-manage',
  templateUrl: 'my-manage.html'
})
export class MyManagePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyManagePage');
  }
}
