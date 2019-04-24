import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'

@Component({
  selector: 'page-my-recode',
  templateUrl: 'my-recode.html'
})
export class MyRecodePage{
  ReCodeData=[];
  ReCodeitem=[];
  footerText:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http) {

  }
  ionViewWillEnter(){
    this.http.get("assets/json/My_reCode.json").subscribe(data =>{
      this.ReCodeitem=data.json();
      for (let i = 0; i < 20; i++) {
        this.ReCodeData.push( this.ReCodeitem[i] );
      }
    })
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MyRecodePage');
  // }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      if(this.ReCodeData.length<this.ReCodeitem.length){
        for (let i = 0; i < 20; i++) {
          this.ReCodeData.push( this.ReCodeitem[i] );
        }
      }else{
        this.footerText=true;
      }
      infiniteScroll.complete();
    }, 500);
  }

}
