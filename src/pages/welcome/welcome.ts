import { Component } from '@angular/core';
import {  Platform,NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
                private platform: Platform,private statusBar: StatusBar
                ,private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.overlaysWebView(true);//可以控制滚动条
      this.statusBar.hide();
      this.splashScreen.hide();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  goToHome() {
    this.navCtrl.setRoot(TabsPage);
  }
}
