import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import  {  LiveDetailsPage } from '../live-details/live-details';

import { Screenshot } from '@ionic-native/screenshot'; //截屏插件
import { Http} from '@angular/http';
/*
  Generated class for the Live page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-live',
  templateUrl: 'live.html'
})
export class LivePage {
  private LiveUrl="assets/json/Live.json";
  LiveData;
  LiveDataHeader: Object = {};
  LiveDataRow;
  constructor(public navCtrl: NavController, public navParams: NavParams,
            public app:App,private screenshot: Screenshot,private http: Http) {

  }

  ionViewWillEnter() {
    this.http.get(this.LiveUrl).subscribe(
      data => {
        this.LiveData = data.json();
        this.LiveDataHeader = this.LiveData.header;
        this.LiveDataRow = this.LiveData.row
      }
    )
  }
  getLiveDetailsPage(data){
    this.navCtrl.push(LiveDetailsPage,data)
  }
  HomeSearch () {
    alert('没有')
  }
  Screenshot() {
    this.screenshot.save('jpg', 100, 'myscreenshot.jpg').then(
      (data) => {
        alert(data)
      },
      (error) => {
        alert(error)
      }
    );
    this.screenshot.URI(100).then(
      (data) => {
        alert(data)
      },
      (error) => {
        alert(error)
      }
    );
  }
}
