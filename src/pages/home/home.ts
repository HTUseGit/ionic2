import { Component } from '@angular/core';
import { NavController, NavParams,Platform ,App,AlertController} from 'ionic-angular';
import { SearchPage } from '../search/search';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FeiYuMapPage } from '../fei-yu-map/fei-yu-map';
import { HomeGamePage } from '../home-game/home-game';
//和状态栏
import { StatusBar } from '@ionic-native/status-bar';

// 扫描二维码插件
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { PhotoViewer } from '@ionic-native/photo-viewer';  //照片查看器
import {File} from '@ionic-native/file';//文件
import { SMS } from '@ionic-native/sms';//短信
import { Contacts } from '@ionic-native/contacts'; //联系人
import {Storage} from '@ionic/storage';  //本地存储
// import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk';  //QQ SDK



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  VerificationCode: string = '获取验证码' ;
  time :number = 60;
  timeHandler;
  buttonFlag: boolean = false;
  FTMimgSrc: string = 'assets/images/home/shouye_yz_02.png';
  // contactsMsg: string = '空数据';
  contactsObj: any;
  conactsFlag: boolean = false;
  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams
    , public platform: Platform, private app: App, public alertCtrl: AlertController,
              private statusBar: StatusBar, private barcodeScanner: BarcodeScanner,
              private androidFingerprintAuth: AndroidFingerprintAuth,
              private photoViewer: PhotoViewer,private file: File,private sms: SMS,
              private storage: Storage,private contacts: Contacts) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.overlaysWebView(false);
      // let status bar overlay webview
      this.statusBar.overlaysWebView(true);
// set status bar to white
      this.statusBar.backgroundColorByHexString('#4B6C8D');
      //StatusBar.hide();
    });
  }

  HomeSearch() {
    this.app.getRootNav().push(SearchPage);
  }

  QrCodeScanning() {
    this.barcodeScanner.scan().then(
      (barcodeData) => {
        // Success! Barcode data is here
        // this.http.get('http://192.168.2.15:8899/testone.do?'+barcodeData).subscribe(res =>console.log(res))
        //   alert("We got a barcode\n" +
        //     "Result: " + barcodeData.text + "\n" +
        //     "Format: " + barcodeData.format + "\n" +
        //     "Cancelled: " + barcodeData.cancelled);
        if( barcodeData.text != ''){
          let confirm = this.alertCtrl.create({
            message: '是否跳转到' + barcodeData.text ,
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

  JumpMap() {
    this.app.getRootNav().push(FeiYuMapPage);
  }
  gamePage(){
    this.app.getRootNav().push(HomeGamePage);
  }
  fingerPrint() {
    this.androidFingerprintAuth.isAvailable()
      .then((result) => {
        if (result.isAvailable) {
          // it is available
          this.androidFingerprintAuth.encrypt({clientId: 'myAppName', username: 'myUsername', password: 'myPassword'})
            .then(result => {
              if (result.withFingerprint) {
                alert('指纹验证成功');
                // alert('Encrypted credentials: ' + result.token);
              } else if (result.withBackup) {
                console.log('Successfully authenticated with backup password!');
              } else console.log('%cDidn\'t authenticate!', 'color:#e8c406');
            })
            .catch(error => {
              if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                console.log('%cFingerprint authentication cancelled', 'color: #e8c406');
              } else console.error(error)
            });
        } else {
          // fingerprint auth isn't available
        }
      })
      .catch(error => console.error(error));
  }

  ImgCg() {
    //dataURL的类型为base64的字符串数据，
    //IOS的处理方式：
    // this.photoViewer.show(this.file.applicationDirectory + "www/地址")
    // Android的处理方式如下
    this.file.readAsDataURL(this.file.applicationDirectory + 'www/assets/images/home/','shouye_yz_02.png')
      .then((dataURL:string) => {
      alert(dataURL);
      this.photoViewer.show(dataURL,'提莫队长',{share: true})
    })
      .catch(error => console.log(error))
  }

  sendSMS(tel) {
    let YanZCode: number =Math.floor(Math.random()*899999+100000) ;
    this.storage.set('YanZCode',YanZCode);
    this.sms.send(tel, '验证码是'+ YanZCode +',这很重要，请不要轻易告诉别人,点击下方链接http://www.baidu.com','');
    this.time = 60;
    this.timeHandler = setInterval( () => {
      if(this.time <= 0){
        this.VerificationCode = '发送验证码';
        this.buttonFlag = false;
        clearInterval(this.timeHandler);
        this.storage.remove('YanZCode');
      }else{
        this.time--;
        this.buttonFlag = true;
        this.VerificationCode = this.time +'s后重新发送'
      }
    },1000)
  }
  MarkSureCode(code) {
    this.storage.get('YanZCode')
      .then(
        (data) => {
          if(data != null){
            if(code == data){
              this.alertConfirm('验证成功，正在跳转....')
            }else{
              this.alertConfirm('验证码输入错误，请重新输入')
            }
          }else{
            this.alertConfirm('验证码已过期，请重新发送')
          }
        })
      .catch((error) => {console.log(error)})
  }
  alertConfirm(title){
    let alert = this.alertCtrl.create({
      title: title,
      buttons: [
        {
          text:"是",
          handler:()=>{
            console.log('是')
          }

        }
      ]
    });
    alert.present()
  }

  getContacts() {
    this.contacts.pickContact().then(
      (contact) => {
        // this.contactsMsg = JSON.stringify(contact);
        this.conactsFlag = true;
        this.contactsObj = contact;
        // alert(contact.displayName);
      }, (err) => {
        alert('Error:'+ err)
      }
    )
  }

  // qq文字分享
  sendMsg(vl) {
    // const clientOptions: QQShareOptions = {
    //   client: this.qq.ClientType.QQ,
    // };
    console.log(vl);
    // this.qq.ssoLogin(clientOptions)
    //   .then(result => {
    //     // Success
    //     console.log('token is ' + result.access_token);
    //     console.log('userid is ' + result.userid);
    //     console.log('expires_time is ' + new Date(parseInt(result.expires_time)) + ' TimeStamp is ' + result.expires_time);
    //   })
    //   .catch(error => {
    //     console.log(error); // Failed
    //   });
  }
}
