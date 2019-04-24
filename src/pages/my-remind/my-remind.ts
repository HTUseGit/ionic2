import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the MyRemind page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-remind',
  templateUrl: 'my-remind.html'
})
export class MyRemindPage {
  mainCheckState: boolean=true;
  FiveCheckState: boolean=true;
  PCheckState: boolean=true;
  ThreeCheckState: boolean=true;
  LOLCheckState: boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRemindPage');
  }
  mainChecked(){
    this.mainCheckState = !this.mainCheckState;
    // console.log(this.mainCheckState)
    if(this.mainCheckState == false){
      this.FiveCheckState = false;
      this.PCheckState = false;
      this.ThreeCheckState = false;
      this.LOLCheckState = false;
    }else {
      this.FiveCheckState = true;
      this.PCheckState = true;
      this.ThreeCheckState = true;
      this.LOLCheckState = true;
    }
  }
  FiveCheck(e) {
    console.log(e.checked);
  }
  PCheck(e) {
    console.log(e.checked);
  }
  ThreeCheck(e) {
    console.log(e.checked);
  }
  LOLCheck(e) {
    console.log(e.checked);
  }
}
