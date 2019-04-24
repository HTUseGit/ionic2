import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
/*
  Generated class for the MyQrCode page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var jQuery;
declare var qrcode;
@Component({
  selector: 'page-my-qr-code',
  templateUrl: 'my-qr-code.html',
  providers:[NativeStorage]
})

export class MyQrCodePage {
  avatarPath : string = 'assets/images/My/PersonalInfo.png';
  userName: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,private nativeStorage:NativeStorage
  ,private storage:Storage) {}

  ionViewDidEnter() {
    this.storage.get('user')
      .then(
        data =>  {
          this.userName = data.username;
          this.CreatEnCode(data.username)

        },
        error => alert(error)
      );
    this.storage.get('avatarPath').then(data => {
      if(data != null){
        this.avatarPath = data;
      }else {
        this.avatarPath = 'assets/images/My/PersonalInfo.png'
      }
    })
  }
  toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
      }
    }
    return out;
  }
  CreatEnCode(QRUserName){
    console.log(QRUserName)
    let str=this.toUtf8(QRUserName)
    // BarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE,"http://www.baidu.com").then(
    //   (result)=>{
    //     console.log(1111)
    //   this.erweima=result;
    //   console.log(result)
    // } ,
    //   (err) =>{
    //     // An error occurred
    //     console.log(err)
    //   }
    //
    // )
    console.log(str)
    jQuery("#CreateCode").qrcode({
      render: "canvas", //canvas/table方式
      width: 200, //宽度
      height:200, //高度
      text: str //任意内容
    });
  }
}
