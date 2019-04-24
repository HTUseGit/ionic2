import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, NavParams ,ViewController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
declare var AMap;
/*
  Generated class for the MapSearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map-search',
  templateUrl: 'map-search.html',
  providers:[NativeStorage]
})
export class MapSearchPage {
  autoOptions;autocomplete;items: any[] = [];
  placeSearch:any;
  map;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController
  ,private nativeStorage: NativeStorage,private storage:Storage) {

  }

  ionViewDidLoad() {
    let that=this;
    that.storage.get('MapSearchHistory').then(
      data => {
        if(data!=null){
          for(let i=0;i<data.length;i++){
            that.items.push(data[i])
          }
        }
        console.log(data)
      }
    )
    AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function() {//回调函数
      //实例化Autocomplete
      // console.log(that.inputId)
      that.autoOptions= {
        city: "", //城市，默认全国
        input: "mapSearch"  //使用联想输入的input的id
      };
      that.placeSearch = new AMap.PlaceSearch({
        city:'',
        map:that.map
      });
      that.autocomplete= new AMap.Autocomplete(that.autoOptions);
      //TODO: 使用autocomplete对象调用相关功能
      AMap.event.addListener(that.autocomplete, "select", LocationName);//注册监听，当选中某条记录时会触发
        function LocationName(e){
          // e.poi.district+e.poi.address
          that.placeSearch.search(e.poi.name)
          that.items.push({"name":e.poi.name,"address":e.poi.district+e.poi.address,
            "position":{"lng":e.poi.location.lng,"lat":e.poi.location.lat}});
          that.storage.set('MapSearchHistory',that.items);
          that.viewCtrl.dismiss(e)
        }
    })
  }
  mapBackPage(){
    this.viewCtrl.dismiss();
  }
  clearHistory() {
    this.nativeStorage.remove('MapSearchHistory');
    this.items = [];
  }
  selectItem(item){
    console.log(item)
    this.viewCtrl.dismiss(item.name)
  }
  makeSureMapSearch(value){
    this.items.push({"name":value,"address":""});
    this.storage.set('MapSearchHistory',this.items);
    this.viewCtrl.dismiss(value)
  }






}
