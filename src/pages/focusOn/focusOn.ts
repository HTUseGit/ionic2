import { Component,OnInit,Injectable} from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';



import { Http,Headers,URLSearchParams  } from '@angular/http';
import 'rxjs/add/operator/map';

import { FocusQrCodePage } from '../focus-qr-code/focus-qr-code';

@Component({
  selector: 'page-focusOn',
  templateUrl: 'focusOn.html'
})
@Injectable()
export class FocusOnPage implements OnInit{
  pet: string = "Live";
  FocusOnData:any;
  UnFocusData:any;
  flag: boolean = false;
  sex : string = '';
  name: string = '';
  private FocusUrl="assets/json/Focus.json";
  constructor(
    public navCtrl: NavController,
    public alerCtrl: AlertController,
    public http:Http
  ) {}
  ngOnInit():void{
    this.http.get(this.FocusUrl).subscribe(data =>{
      this.FocusOnData=data.json().FocusOn;
      this.UnFocusData=data.json().unFocus;
    })
  }
  CancelFocus(item){
    let alert = this.alerCtrl.create({
      title: '你确定要取消关注吗？',
      buttons: [
        {
          text:"是",
          handler:()=>{
            item.ClickCancelFocus=true;
            console.log('是')
          }

        },{
          text:"否",
          handler:()=>{
            console.log('否')
          }
        }
      ]
    });
    alert.present()
  }
  getData(){
    // 测试远程服务的访问，只要后台设置好了允许跨域，自然就不存在跨域的问题了，
    // 下面就是一个测试的例子，只用于测试，服务是自己搭建的。
    // this.http.get('http://192.168.1.149:8899/testone.do?id=1&name=1212')
    //   .subscribe((data) => {
    //     this.flag = true;
    //     this.sex = data.json().sex;
    //     this.name = data.json().username;
    //   },err => {alert(err)});
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded','Accept': 'application/json'});
    let params = new URLSearchParams();
    params.set('id',"1212");
    params.set('name','黄滔');
    this.http.post('http://192.168.1.149:8899/testone.do', params, headers).subscribe(
      (data) => {
        this.flag = true;
        this.sex = data.json().sex;
        this.name = data.json().username;
      },err => {alert(err)}
    )
  }
  PushQrCode() {
    this.navCtrl.push(FocusQrCodePage)
  }

}
