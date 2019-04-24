import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, AlertController, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {NativeServiceProvider} from '../../providers/native-service/native-service';

import {AppVersion} from '@ionic-native/app-version';  //用于获取应用包名 版本之类额
/*
 Generated class for the MySet page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-my-set',
  templateUrl: 'my-set.html'
})
export class MySetPage {
  contrast: number = 0;
  text: number = 0;
  netWorkStatus: boolean = false;
  MyAppVersion;
  CacheNumber: number = 236;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage: Storage, public viewCtrl: ViewController,
              public nativeService: NativeServiceProvider,
              private appVersion: AppVersion,
              public alerCtrl: AlertController,
              public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    this.appVersion.getVersionNumber().then(
      version => {
        this.MyAppVersion = version
      }, err => {
        console.log(err)
      }
    )
    let netWorkType;
    netWorkType = this.nativeService.getNetworkType();
    alert(netWorkType)
  }

  notify() {
    if (this.netWorkStatus == true) {
      let alert = this.alerCtrl.create({
        title: '确定要开启流量吗？',
        buttons: [
          {
            text: "是",
            handler: () => {
              console.log('是')
            }

          }, {
            text: "否",
            handler: () => {
              console.log('否')
            }
          }
        ]
      });
      alert.present()
    }
  }

  DropOut() {
    this.storage.remove('user');
    this.storage.remove('avatarPath');
    this.viewCtrl.dismiss();
  }

  netWorkfuc() {
    if (this.netWorkStatus == true) {
      console.log('正在尝试开启3G/4G流量')
    } else {
      console.log(222222)
    }
  }


  clearCache() {
    let alert = this.alerCtrl.create({
      title: '你确定要清除吗？',
      buttons: [
        {
          text: "是",
          handler: () => {
            this.CacheNumber = 0;
            console.log('是')
          }

        }, {
          text: "否",
          handler: () => {
            console.log('否')
          }
        }
      ]
    });
    alert.present()
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: '已经是最新版本了',
      duration: 2000,
      // cssClass: 'toast-wrapper',  //修改toast的样式
      position: position
    });
    toast.present(toast);
  }
}
