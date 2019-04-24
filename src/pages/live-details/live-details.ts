import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
declare var flvjs; // H5的视频直播

/*
  Generated class for the LiveDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-live-details',
  templateUrl: 'live-details.html'
})
export class LiveDetailsPage {
  LivePageValue;
  constructor(public navCtrl: NavController, public navParams: NavParams,private streamingMedia: StreamingMedia) {
   this.LivePageValue = this.navParams.data ;
    console.log(this.LivePageValue)
  }

  ionViewDidLoad() {
    // let options: StreamingVideoOptions = {
    //   successCallback: () => { alert('Video played') },
    //   errorCallback: (e) => { alert('Error streaming') },
    //   orientation: 'landscape'
    // };
    // this.streamingMedia.playVideo('http://61.128.153.102/65760EB8AC83881D00692430AB/03000A130359C1AB1B60D200000001AFB93EB5-9F1A-9887-DBA4-E1AAEC73583A.mp4?ccode=0502&duration=392&expire=18000&psid=cd6fc77153a20fe2b999b9b0573be23c&ups_client_netip=218.89.238.210&ups_ts=1507607386&ups_userid=&utid=PSgkEnG2Vw4CAavUcpbfjjQJ&vid=XMTMwNzQwMTcwMA%3D%3D&vkey=A9077ac71b0283ff391d400635f1433d8', options);
    // console.log('视频直播 ');
    // console.log(flvjs)
    // if (flvjs.isSupported()) {
    //   let videoElement = document.getElementById('flv_test_div');
    //   let flvPlayer = flvjs.createPlayer({
    //     type : 'flv',
    //     url : 'http://localhost:7001/live/test.flv'
    //   }, {
    //     enableWorker : true,
    //     isLive : true
    //   }); //);//
    //   flvPlayer.attachMediaElement(videoElement);
    //   flvPlayer.load();
    //   flvPlayer.play();
    // }

  }

}
