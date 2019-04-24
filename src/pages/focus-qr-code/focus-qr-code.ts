import { Component } from '@angular/core';
import {NavController, NavParams,AlertController ,ViewController } from 'ionic-angular';
import { PopoverController} from 'ionic-angular';
import { PersonalInformationPage } from '../personal-information/personal-information';


// 扫描二维码插件
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
@Component({
  template:`
    <ion-list>
        <ion-row style="font-size: 16px;font-family: 微软雅黑">测试用</ion-row>
        <ion-row style="font-size: 16px;font-family: 微软雅黑" (click)="PhotoQrCode()">从相册选择二维码</ion-row>
    </ion-list>
  `,
  providers: [PersonalInformationPage]
})

export class PopoverPage {
  constructor (private barcodeScanner: BarcodeScanner,private alertCtrl: AlertController,
               private PIP: PersonalInformationPage,private storage: Storage,
                private viewCtrl: ViewController) {

  }
  PhotoQrCode(){
    this.viewCtrl.dismiss();
    this.PIP.ChoiceWay();
  }

}

@Component({
  selector: 'page-focus-qr-code',
  templateUrl: 'focus-qr-code.html'
})
export class FocusQrCodePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private popoverCtrl: PopoverController,
     private barcodeScanner: BarcodeScanner,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.barcodeScanner.scan().then(
      (barcodeData) => {
        // Success! Barcode data is here
        // this.http.get('http://192.168.2.15:8899/testone.do?'+barcodeData).subscribe(res =>console.log(res))
        //   alert("We got a barcode\n" +
        //     "Result: " + barcodeData.text + "\n" +
        //     "Format: " + barcodeData.format + "\n" +
        //     "Cancelled: " + barcodeData.cancelled);
        if(barcodeData != null){
          let confirm = this.alertCtrl.create({
            message: '是否跳转到' + barcodeData.text,
            buttons: [
              {
                text: '否',
                handler: () => {
                  console.log('否')
                }
              },
              {
                text: '是',
                handler: () => {
                  window.open(barcodeData.text)
                }
              }
            ]
          });
          confirm.present()
        }
      },
      (err) => {
        // An error occurred
        console.log(err)
      })
  }
  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);

    popover.present({
      ev: ev
    });
  }

}
