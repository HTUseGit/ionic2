import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';



import { MyPage } from '../pages/my/my';
import { LivePage } from '../pages/live/live';
import { FocusOnPage } from '../pages/focusOn/focusOn';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { MyRemindPage } from '../pages/my-remind/my-remind';
import { MyQueryPage } from '../pages/my-query/my-query';
import { MySetPage } from '../pages/my-set/my-set';
import { MySetOptionsPage } from '../pages/my-set-options/my-set-options';
import { MyRechargePage } from '../pages/my-recharge/my-recharge';
import { MyTaskPage } from '../pages/my-task/my-task';
import { MyManagePage } from '../pages/my-manage/my-manage';
import { MyRecodePage } from '../pages/my-recode/my-recode';
import { MyQrCodePage } from '../pages/my-qr-code/my-qr-code';
import { PayPage } from '../pages/pay/pay';
import { LiveDetailsPage } from '../pages/live-details/live-details'
import { LoginPage } from '../pages/my/login/login';
import { RegisterPage } from '../pages/my/register/register';
import { PersonalInformationPage } from '../pages/personal-information/personal-information';
import { FeiYuMapPage } from '../pages/fei-yu-map/fei-yu-map';
import { MapSearchPage } from '../pages/map-search/map-search';
import { HomeGamePage } from '../pages/home-game/home-game';
import { WelcomePage } from '../pages/welcome/welcome';
import { FocusQrCodePage,PopoverPage } from '../pages/focus-qr-code/focus-qr-code';

import { StatusBar } from '@ionic-native/status-bar'; //状态栏
import { SplashScreen } from '@ionic-native/splash-screen'; // 飞溅屏幕
import {Camera} from '@ionic-native/camera';//照相机
import {Toast} from '@ionic-native/toast';//显示
import {File} from '@ionic-native/file';//文件
import {Network} from '@ionic-native/network';//网络判断
import { BarcodeScanner } from '@ionic-native/barcode-scanner';//二维码
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';//Android 指纹
import { PhotoViewer } from '@ionic-native/photo-viewer';//照片查看
import { Contacts } from '@ionic-native/contacts'; //联系人
import { SMS } from '@ionic-native/sms'; // 短信
import { Screenshot } from '@ionic-native/screenshot'; //截屏插件
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification'; //本地通知
import { TextToSpeech } from '@ionic-native/text-to-speech'; //将文字读出来
import { AppVersion } from '@ionic-native/app-version';  //用于获取应用包名 版本之类额
// import { Diagnostic } from '@ionic-native/diagnostic'; //用于检测设备上的硬件功能，并可以相应开启
import { StreamingMedia} from '@ionic-native/streaming-media';


// import { QQSDK } from '@ionic-native/qqsdk';  //QQ SDK

import { NativeServiceProvider } from '../providers/native-service/native-service';





@NgModule({
  declarations: [
    MyApp, MyPage, FocusOnPage, LivePage, HomePage, TabsPage, SearchPage, LiveDetailsPage,
    MyRemindPage,MyQueryPage,MySetPage,MyRechargePage,MyTaskPage,MyManagePage,MyRecodePage,
    PayPage,LoginPage, RegisterPage,PersonalInformationPage,MyQrCodePage,FeiYuMapPage,MapSearchPage,
    MySetOptionsPage,HomeGamePage,WelcomePage,FocusQrCodePage,PopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      backButtonIcon:'ios-arrow-back',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios',
      mode: 'ios',
      tabsHideOnSubPages: true   //用于消除子页面的tabs，即在子页面不会出现tabs。
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, MyPage, FocusOnPage, LivePage, HomePage, TabsPage, SearchPage, LiveDetailsPage,
    MyRemindPage,MyQueryPage,MySetPage,MyRechargePage,MyTaskPage,MyManagePage,MyRecodePage,
    PayPage,LoginPage, RegisterPage,PersonalInformationPage,MyQrCodePage,FeiYuMapPage,MapSearchPage,
    MySetOptionsPage,HomeGamePage,WelcomePage,FocusQrCodePage,PopoverPage
  ],
  providers: [
    StatusBar, SplashScreen, Camera, Toast, File, Network,
    BarcodeScanner,AndroidFingerprintAuth,PhotoViewer, SMS, Contacts,
    Screenshot,PhonegapLocalNotification,TextToSpeech,AppVersion,StreamingMedia,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeServiceProvider
  ]
})
export class AppModule {}
