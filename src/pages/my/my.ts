import { Component,Injectable,OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, NavParams,App,Events,ModalController} from 'ionic-angular';
import { MyRemindPage } from '../my-remind/my-remind';
import { MyQueryPage } from '../my-query/my-query';
import { MySetPage } from '../my-set/my-set';
import { MyRechargePage } from '../my-recharge/my-recharge';
import { MyTaskPage } from '../my-task/my-task';
import { MyManagePage } from '../my-manage/my-manage';
import { MyRecodePage } from '../my-recode/my-recode';
import { MyQrCodePage } from '../my-qr-code/my-qr-code';
import { LoginPage } from './login/login';
import { RegisterPage } from './register/register';
import { PersonalInformationPage } from '../personal-information/personal-information';
import { NativeStorage } from '@ionic-native/native-storage';
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
  providers:[NativeStorage,PersonalInformationPage]
})
@Injectable()
export class MyPage implements OnInit{
  UserName:string="未登录";
  UserFlag: boolean = false;
  QRcode:boolean=false;
  avatarPath: string = './assets/images/My/PersonalInfo.png';//用户默认头像
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public app:App,private nativeStorage:NativeStorage,public events:Events,
  private modalCtrl:ModalController,private storage:Storage,public PIP: PersonalInformationPage) {

  }
  ngOnInit(){

  }
  ionViewDidEnter(){
      this.storage.get('user')
        .then(
          data =>  {
            console.log(data);
            if(data != null){
              this.UserName=data.username;
              this.QRcode=true;
              this.UserFlag = true;
            }else{
              this.UserName="未登录";
              this.QRcode=false;
              this.UserFlag = false;
            }
          },
          error => alert(error)
        );
      this.storage.get('avatarPath').then( data => {
        if (data != null){
          this.avatarPath = data;
        }
      })
  }
  JumpRemind(){
    this.app.getRootNav().push(MyRemindPage)
  }
  JumpQuery(){
    this.app.getRootNav().push(MyQueryPage)
  }
  JumpSet(){
    let modal = this.modalCtrl.create(MySetPage);
    modal.present();
    modal.onDidDismiss(data1 =>{
      console.log(data1);
      if(data1 == undefined){
        this.UserName="未登录";
        this.QRcode=false;
        this.UserFlag = false;
        this.avatarPath = './assets/images/My/PersonalInfo.png'
      }
    })
}
  JumpReCharge(){
    this.app.getRootNav().push(MyRechargePage)
  }
  JumpTask(){
    this.app.getRootNav().push(MyTaskPage)
  }
  JumpManage(){
    this.app.getRootNav().push(MyManagePage)
  }
  JumpRecode(){
    this.app.getRootNav().push(MyRecodePage)
  }
  JumpLogin(){
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
    modal.onDidDismiss(data1 =>{
      console.log(data1)
      if(data1==undefined){
        this.storage.get('user')
          .then(
            data =>  {
              console.log(data)
              if(data!=null){
                //alert("这是用户名："+data.username +"这是密码："+ data.password);
                this.UserName=data.username;
                this.QRcode=true;
                this.UserFlag = true;
              }else{
                this.UserName="未登录";
                this.QRcode=false;
                this.UserFlag = false;
              }
            },
            error => alert(error)
          );
      }else{
        this.storage.get('user')
          .then(
            data =>  {
              console.log(data)
              if(data!=null){
                //alert("这是用户名："+data.username +"这是密码："+ data.password);
                this.UserName=data.username;
                this.QRcode=true;
                this.UserFlag = true;
              }else{
                this.UserName="未登录";
                this.QRcode=false;
                this.UserFlag = false;
              }
            },
            error => alert(error)
          );
      }
    })


    // this.app.getRootNav().push(LoginPage)
  }
  JumpRegister(){
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
    modal.onDidDismiss(data1 =>{
      if(data1==undefined){
        this.storage.get('user')
          .then(
            data =>  {
              console.log(data)
              if(data!=null){
                //alert("这是用户名："+data.username +"这是密码："+ data.password);
                this.UserName=data.username
                this.QRcode=true;
              }else{
                this.UserName="未登录";
                this.QRcode=false;
              }
            },
            error => alert(error)
          );
      }else{
        this.storage.get('user')
          .then(
            data =>  {
              console.log(data)
              if(data!=null){
                //alert("这是用户名："+data.username +"这是密码："+ data.password);
                this.UserName=data.username
                this.QRcode=true;
              }else{
                this.UserName="未登录";
                this.QRcode=false;
              }
            },
            error => alert(error)
          );
      }
    })
    // this.app.getRootNav().push(RegisterPage)
  }
  JumpPersonalInfo(){
    let modal = this.modalCtrl.create(PersonalInformationPage);
    modal.present();
    modal.onDidDismiss(data1 =>{
      console.log(data1)
      if(data1 == undefined){
        this.storage.get('avatarPath')
          .then(
            data =>  {
              console.log(data)
              if(data != null){
                this.avatarPath = data;
              }
            },
            error => alert(error)
          );
      }else{
        this.storage.get('avatarPath').then(
          data => {
            if (data != null) {
              this.avatarPath = data
            }else{
              this.avatarPath =  './assets/images/My/PersonalInfo.png';
            }
          },
          error => alert(error)
        )
      }
    })
  }
  JumpQRCode(){
    this.app.getRootNav().push(MyQrCodePage)
  }
  HeaderImg() {
    this.PIP.ChoiceWay();
  }
}
