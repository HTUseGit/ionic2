import { Component,ViewChild } from '@angular/core';
import { Platform, AlertController,ToastController, Nav, IonicApp,App } from 'ionic-angular';
import { Http,Headers } from '@angular/http';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import {Storage} from '@ionic/storage';

import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification'; //本地通知

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any ;  //设置app进入后最先访问的页面。
  backButtonPressed: boolean = false; //用于判断返回键是否触发
  @ViewChild('myNav') nav: Nav;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,
              public ionicApp: IonicApp, public alertCtrl: AlertController,
              public toastCtrl: ToastController,public app: App,
              public storage: Storage,public localNotification: PhonegapLocalNotification,
              public http: Http) {
    // this.rootPage = WelcomePage; //测试用
    this.storage.get('firstIn').then((result) => {
        if(result){
          this.rootPage = TabsPage;
        } else{
          this.storage.set('firstIn', true);
          this.rootPage = WelcomePage;
        }
      }
    );
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.overlaysWebView(true);//可以控制滚动条
      this.statusBar.backgroundColorByHexString("#4B6C8D");
      this.splashScreen.hide();
      this.registerBackButtonAction();//注册返回按键事件
      //本地通知部分
      // Create the notification
      // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded','Accept': 'application/json'});
      // this.http.get('http://192.168.1.149:8899/localNotification.do').subscribe(
      //   data => {
          // console.log(data.text()) //data后面点的是什么，主要看后台返回的数据类型是什么;
          // console.log(data.json())
          // alert(data.json().msg);
          this.localNotification.requestPermission().then(
            (permission) => {
              if (permission === 'granted') {
                this.localNotification.create('头部标题', {
                  tag: 'message1',
                  body: ''+'这是我发布的最新消息',
                  icon: 'assets/icon/favicon.ico'
                });

              }
            }
          );
        // }
      // )
    });
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction((): any  => {
      let activeVC = this.nav.getActive();
      let page = activeVC.instance;
      if (!(page instanceof TabsPage)) {
        if (!this.nav.canGoBack()) {
          //当前页面为tabs，退出APP
          return this.showExit();
        }
        //当前页面为tabs的子页面，正常返回
        return this.nav.pop();
      }
      let tabs = page.tabs;
      let activeNav = tabs.getSelected();
      if (!activeNav.canGoBack()) {
        //当前页面为tab栏，退出APP
        return this.showExit();
      }
      //当前页面为tab栏的子页面，正常返回
      return activeNav.pop();
    }, 101);
// 后面的数字10是必要参数，如果不写默认是0，数字越大优先级越高

  }

  //双击显示退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}
