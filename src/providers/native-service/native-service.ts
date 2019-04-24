import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, LoadingController, Platform, Loading, AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Toast} from '@ionic-native/toast';
import {File} from '@ionic-native/file';
import {Network} from '@ionic-native/network';
import {Position} from "../../../typings/index";
declare var LocationPlugin;
declare var AMapNavigation;
/*
  Generated class for the NativeServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NativeServiceProvider {
  private loading: Loading;
  private loadingIsOpen: boolean = false;

  constructor(public http: Http,private platform: Platform,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private camera: Camera,private toast: Toast,
              private network: Network,private file: File) {
    console.log('Hello NativeServiceProvider Provider');
  }
  warn(info): void {
    console.log('%cNativeService/' + info, 'color:#e8c406');
  }

  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 判断是否有网络
   * @returns {boolean}
   */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }


  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }


  /**
   * 关闭loading
   */
  hideLoading(): void {
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  };


  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast(message: string = '操作完成', duration: number = 2000): void {
    if (this.isMobile()) {
      this.toast.show(message, String(duration), 'center').subscribe();
    } else {
      this.toastCtrl.create({
        message: message,
        duration: duration,
        position: 'middle',
        showCloseButton: false
      }).present();
    }
  };


  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading(content: string = ''): void {
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        content: content
      });
      this.loading.present();
      setTimeout(() => {//最长显示10秒
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
      }, 10000);
    }
  };


  /**
   * 获得用户当前坐标
   * @return {Promise<Position>}
   */
  getUserLocation(): Promise<Position> {
    return new Promise((resolve) => {
      if (this.isMobile()) {
        LocationPlugin.getLocation(data => {
          resolve({'lng': data.longitude, 'lat': data.latitude});
        }, msg => {
          alert(msg.indexOf('缺少定位权限') == -1 ? ('错误消息：' + msg) : '缺少定位权限，请在手机设置中开启');
          this.warn('getUserLocation:' + msg);
        });
      }
      else {
        this.warn('getUserLocation:非手机环境,即测试环境返回固定坐标');
        resolve({'lng': 104.065834, 'lat':30.547087 });
      }
    });
  }

  /**
   * 地图导航
   * @param startPoint 开始坐标
   * @param endPoint 结束坐标
   * @param type 0实时导航,1模拟导航,默认为模拟导航
   * @return {Promise<string>}
   */
  navigation(startPoint: Position, endPoint: Position, type = 1): Promise<string> {
    return new Promise((resolve) => {
      if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
        AMapNavigation.navigation({
          lng: startPoint.lng,
          lat: startPoint.lat
        }, {
          lng: endPoint.lng,
          lat: endPoint.lat
        }, type, function (message) {
          resolve(message);
        }, function (err) {
          alert('导航失败:' + err);
          this.warn('navigation:' + err);
        });
      } else {
        // this.showToast('非手机环境不能导航');
      }
    });
  }

  /**
   * 使用cordova-plugin-camera获取照片
   * @param options
   * @returns {Promise<string>}
   */
  getPicture(options: CameraOptions = {}): Promise<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
      destinationType: this.camera.DestinationType.DATA_URL,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
      quality: 100,//图像质量，范围为0 - 100
      allowEdit: true,//选择图片前是否允许编辑
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 1000,//缩放图像的宽度（像素）
      targetHeight: 1000,//缩放图像的高度（像素）
      saveToPhotoAlbum: true,//是否保存到相册
      correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
    }, options);
    return new Promise((resolve) => {
      this.camera.getPicture(ops).then((imgData: string) => {
        resolve(imgData);
      }, (err) => {
        err == 20 && this.showToast('没有权限,请在设置中开启权限');
        this.warn('getPicture:' + err)
      });
    });
  };

  /**
   * 通过拍照获取照片
   * @param options
   * @return {Promise<string>}
   */
  getPictureByCamera(options: CameraOptions = {}): Promise<string> {
    return new Promise((resolve) => {
      this.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
      }, options)).then((imgData: string) => {
        resolve(imgData);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('获取照片失败');
      });
    });
  };

  /**
   * 通过图库获取照片
   * @param options
   * @return {Promise<string>}
   */
  getPictureByPhotoLibrary(options: CameraOptions = {}): Promise<string> {
    return new Promise((resolve) => {
      this.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
      }, options)).then((imgData: string) => {
        resolve(imgData);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消选择图片', 1500) : this.showToast('获取照片失败');
      });
    });
  };

  /**
   * 通过图库选择多图
   * @param options
   * @return {Promise<T>}
   */
  // getMultiplePicture(options = {}): Promise<any> {
  //   let that = this;
  //   let destinationType = options['destinationType'] || 0;//0:base64字符串,1:图片url
  //   return new Promise((resolve) => {
  //     this.imagePicker.getPictures(Object.assign({
  //       maximumImagesCount: 6,
  //       width: 1000,//缩放图像的宽度（像素）
  //       height: 1000,//缩放图像的高度（像素）
  //       quality: 100//图像质量，范围为0 - 100
  //     }, options)).then(files => {
  //       if (destinationType === 1) {
  //         resolve(files);
  //       } else {
  //         let imgBase64s = [];//base64字符串数组
  //         for (let fileUrl of files) {
  //           that.convertImgToBase64(fileUrl, base64 => {
  //             imgBase64s.push(base64);
  //             if (imgBase64s.length === files.length) {
  //               resolve(imgBase64s);
  //             }
  //           });
  //         }
  //       }
  //     }).catch(err => {
  //       this.warn('getMultiplePicture:' + err);
  //       this.showToast('获取照片失败');
  //     });
  //   });
  // };

  /**
   * 根据图片绝对路径转化为base64字符串
   * @param url 绝对路径
   * @param callback 回调函数
   */
  convertImgToBase64(url: string, callback) {
    this.getFileContentAsBase64(url, function (base64Image) {
      callback.call(this, base64Image.substring(base64Image.indexOf(';base64,') + 8));
    })
  }

  private getFileContentAsBase64(path: string, callback) {
    function fail(err) {
      console.log('Cannot found requested file' + err);
    }

    function gotFile(fileEntry) {
      fileEntry.file(function (file) {
        let reader = new FileReader();
        reader.onloadend = function (e) {
          let content = this.result;
          callback(content);
        };
        reader.readAsDataURL(file);
      });
    }

    this.file.resolveLocalFilesystemUrl(path).then(fileEnter => gotFile(fileEnter)).catch(err => fail(err));
    // window['resolveLocalFileSystemURL'](path, gotFile, fail);
  }
}
