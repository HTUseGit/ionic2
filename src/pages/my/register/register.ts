import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, NavParams,ViewController,AlertController } from 'ionic-angular';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage
  ,private viewCtrl:ViewController,private alertCtrl:AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  Register(name,psd,makePsd){
    if(psd==makePsd){
      this.storage.set('user', {username:name , password:psd})
        .then(
          (data) =>{
            if(data.username!=""&&data.password!=""){
              this.viewCtrl.dismiss(data)
            }else{
              alert("用户名和密码不能为空")
            }

          },
          error => console.error('Error storing item', error)
        );
    }else{
      let confirm = this.alertCtrl.create({
        message: '两次密码输入不一致，请重新输入',
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

            }
          }
        ]
      });
      confirm.present()
    }
  }
  backPage(){
    this.viewCtrl.dismiss();
  }
}
