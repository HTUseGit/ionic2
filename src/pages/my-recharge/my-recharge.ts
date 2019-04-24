import { Component } from '@angular/core';
import { NavController, NavParams,AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PayPage } from '../pay/pay';


@Component({
  selector: 'page-my-recharge',
  templateUrl: 'my-recharge.html'
})
export class MyRechargePage {
  ReChargeList;
  ReChargeNumber=0;

  // Should get from server side with sign.

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
              public alerCtrl: AlertController) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRechargePage');
    this.http.get("assets/json/ReCharge.json").subscribe( res =>{
      this.ReChargeList=res.json();
    } )
  }
  SetBorder(obj){
    if(obj=="其他数量"){
      let alert = this.alerCtrl.create({
        title: '此功能暂不支持',
        buttons: [
          {
            text:"确定"
          }
        ]
      });
      alert.present()
    }else{
      this.ReChargeNumber=parseInt(obj);
    }

  }
  PayClick(a){
    this.navCtrl.push(PayPage,a);
  }
}
