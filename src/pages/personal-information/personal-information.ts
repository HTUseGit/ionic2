import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController ,ViewController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeServiceProvider } from '../../providers/native-service/native-service';

@Component({
  selector: 'page-personal-information',
  templateUrl: 'personal-information.html'
})
export class PersonalInformationPage {
  ChoiceShow: boolean = false;//是否显示图片的来源
  isChange: boolean = false;//头像是否改变标识
  avatarPath: string = './assets/images/My/PersonalInfo.png';//用户默认头像
  imageBase64: string;//保存头像base64,用于上传
  constructor(public navCtrl: NavController, public navParams: NavParams,
        private actionSheetCtrl: ActionSheetController,
        private viewCtrl: ViewController,private nativeService: NativeServiceProvider,
        private storage: Storage) {}

  ionViewDidLoad() {
    this.storage.get('avatarPath').then(
      (data) => {
        if(data != null){
          this.avatarPath = data;
        }else{
          this.avatarPath = './assets/images/My/PersonalInfo.png';
        }
      }
    )
  }
  // DropOut() {
  //   this.storage.remove('user');
  //   this.navCtrl.pop();
  // }
  ChangeSave () {
    this.storage.get('avatarPath').then(
      (data) => {
        if (data != null) {
          this.viewCtrl.dismiss(data) ;
        }else {
          this.viewCtrl.dismiss();
        }
    }),
      error => alert(error)

  }
  ChoiceWay () {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          handler: () => {
            let type = 1;
            this.getPicture(type)
          }
        },
        {
          text: '相册选择',
          handler: () => {
            let type = 2;
            this.getPicture(type)
          }
        },
        {
          text: '取消',
          role: '取消',
          handler: () => {
            console.log('取消')
          }
        }
      ]
    });
    actionSheet.present();
  }
  getPicture(type) {//1拍照,0从图库选择
    let options = {
      targetWidth: 400,//缩放图像的宽度（像素）
      targetHeight: 400//缩放图像的高度（像素）
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).then(imageBase64 => {
        this.getPictureSuccess(imageBase64);
      });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).then(imageBase64 => {
        this.getPictureSuccess(imageBase64);
      });
    }
  }
  public getPictureSuccess(imageBase64) {
    this.isChange = true;
    this.imageBase64 = <string>imageBase64;
    this.avatarPath = 'data:image/jpeg;base64,' + imageBase64;
    this.storage.set('avatarPath',this.avatarPath);

  }

  saveAvatar() {
    if (this.isChange) {
      console.log(this.imageBase64);//这是头像数据.
      this.nativeService.showLoading('正在上传....');
      this.viewCtrl.dismiss({avatarPath: this.avatarPath});//这里可以把头像传出去.
    } else {
      this.dismiss();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
