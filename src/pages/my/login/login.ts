import { Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, NavParams,Events,ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[NativeStorage]
})
export class LoginPage{
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private nativeStorage: NativeStorage,public events:Events,
  public viewCtrl:ViewController,private storage:Storage) {
    console.log(navParams)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  Login(name,psd){
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
    // this.nativeStorage.setItem('user', {username:name , password:psd})
    //   .then(
    //     (data) =>{
    //       this.viewCtrl.dismiss(data)
    //     },
    //     error => console.error('Error storing item', error)
    //   );
  }
  backPage(){
    this.viewCtrl.dismiss()
  }
}
