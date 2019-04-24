import {Component, ViewChild, ElementRef} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController, NavParams, Platform, ModalController, ToastController, AlertController} from 'ionic-angular';
import {MapSearchPage} from '../map-search/map-search';

import {NativeServiceProvider} from '../../providers/native-service/native-service';

declare var AMap, jQuery;

@Component({
  selector: 'page-fei-yu-map',
  templateUrl: 'fei-yu-map.html',
})
export class FeiYuMapPage {
  @ViewChild('map_container') map_container: ElementRef;
  mapIsComplete: boolean = false;//地图是否加载完成；
  showIonFab: boolean = false;//是否显示路线按钮；
  isPositioning: boolean = false;//是否正在定位；
  map: any;     //地图对象
  marker: any;   //地图坐标信息
  UserLocation: any; //用户自己的位置，通过GPS自动定位的位置
  newstPosition: any; //新的地址，用户要去的。
  jiexiPosition: any; //用于搜索页面直接搜索用户输入的，不是选择的智能提示。
  ReturnSelectedLocation: any; //从搜索页面传到地图页面的用户选择的地点
  PlaceName: any; //搜索地点的名称
  DetaileAddress: any;//搜索地点的详细地址
  distance: any; //两个点之间的距离
  MapBottomWindow: boolean = false;  //判断地图页面搜索后是否显示弹出的提示窗口
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private platform: Platform, private nativeService: NativeServiceProvider,
              private modalCtrl: ModalController, private storage: Storage, private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
    platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      console.log(this.map_container)
      this.getUserMapLocation();
    });
  }

  getUserMapLocation() {
    let that = this;
    try {
      that.map = new AMap.Map(this.map_container.nativeElement, {
        view: new AMap.View2D({
          zoom: 11,
          rotateEnable: true,
          showBuildingBlock: true,
        })
      });
      that.map.on('complete', function () {

        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geocoder', 'AMap.Autocomplete', 'AMap.PlaceSearch'], function () {//添加工具条和比例尺
          that.map.addControl(new AMap.ToolBar());
          that.map.addControl(new AMap.Scale());
          that.map.addControl(new AMap.Geocoder());
          that.map.addControl(new AMap.Autocomplete());
          that.map.addControl(new AMap.PlaceSearch());
          that.mapLocation();
        });
      });
      window['HomeAMap'] = that.map;
    } catch (err) {

      //that.mapService.showToast('地图加载失败,请检查网络或稍后再试.')
    }
  }

  mapLocation() {
    let that = this;
    that.isPositioning = true;
    that.nativeService.getUserLocation().then(position => {

      that.UserLocation = position;
      that.map.clearMap();
      that.marker = new AMap.Marker({
        map: that.map,
        position: new AMap.LngLat(position.lng, position.lat)
      });
      // that.map.on('click', function(e) {
      //   alert(e.lnglat.getLng() + ',' + e.lnglat.getLat())
      // });
      that.address(position);
      that.map.setFitView();
      that.map.setZoom(16);
      that.isPositioning = false;

    }, () => {
      that.isPositioning = false;
    });
  }

  address(position) {
    //逆地理编码
    //实例化Geocoder
    let geocoder = new AMap.Geocoder({
      radius: 1000,
      extensions: "all"
    });
    //TODO: 使用geocoder 对象完成相关功能

    const lnglatXY = [position.lng, position.lat];//地图上所标点的坐标
    geocoder.getAddress(lnglatXY, function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        //获得了有效的地址信息:
        //alert(result.regeocode.formattedAddress)
      } else {
        alert("地址获取失败")
      }
    });
  }

  addressToJW(position, bb) {
    //地理到经纬度 编码
    //实例化Geocoder
    var that = this;
    let geocoder = new AMap.Geocoder({
      radius: 1000,
      extensions: "all"
    });

    return new Promise(function (resolve, reject) {
      // //TODO: 使用geocoder 对象完成相关功能
      geocoder.getLocation(position, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          //TODO:获得了有效经纬度，可以做一些展示工作
          //比如在获得的经纬度上打上一个Marker
          that.jiexiPosition = result.geocodes[0];
          // resolve(that.jiexiPosition);
          setTimeout(resolve, bb)
        } else {
          //获取经纬度失败
          reject('获取经纬度失败')
        }
      });

    })
  }

  LocationSearch() {
    let that = this;
    let modal = this.modalCtrl.create(MapSearchPage);
    modal.present();
    modal.onDidDismiss(e => {
      let placeSearch = new AMap.PlaceSearch({
        map: that.map
      });  //构造地点查询类

      if (e != undefined) {
        if (e.type == "select") {
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name);  //关键字查询查询
          that.ReturnSelectedLocation = e.poi.name;
          that.marker = new AMap.Marker({
            map: that.map,
            position: new AMap.LngLat(e.poi.location.lng, e.poi.location.lat)
          });
        } else {
          that.ReturnSelectedLocation = e;
          placeSearch.search(e);  //关键字查询查询
        }

      }

      let lnglat = new AMap.LngLat(that.UserLocation.lng, that.UserLocation.lat);
      that.storage.get('MapSearchHistory').then(
        data => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].name == that.ReturnSelectedLocation) {
              that.newstPosition = data[i];
            }
          }
          console.log(that.newstPosition);
          if (that.newstPosition.address == '') {
            that.addressToJW(that.newstPosition.name, 0).then(function () {
              console.log(that.jiexiPosition)
              that.distance = lnglat.distance([that.jiexiPosition.location.lng, that.jiexiPosition.location.lat]).toPrecision(3);
              if (that.distance >= 1000) {
                that.distance = (that.distance) / 1000 + "Km";
              } else {
                that.distance = that.distance + "m";
              }
              that.showToast(that.newstPosition, that.distance)
            })
          } else {
            that.distance = lnglat.distance([that.newstPosition.position.lng, that.newstPosition.position.lat]).toPrecision(3);
            if (that.distance >= 1000) {
              that.distance = (that.distance) / 1000 + "Km";
            } else {
              that.distance = that.distance + "m";
            }
            that.showToast(that.newstPosition, that.distance)
          }
        }
      )
    })
  }

  showToast(place, distance) {
    this.PlaceName = place.name;
    if (this.newstPosition.address == '') {
      this.DetaileAddress = this.jiexiPosition.formattedAddress
    } else {
      this.DetaileAddress = place.address;
    }
    this.distance = distance;
    this.MapBottomWindow = true;
    this.mapLocationIcon(this.MapBottomWindow);

  }

  mapLocationIcon(status) {
    if (status == true) {
      jQuery(".position-btn").css("bottom", "120px");
    } else {
      jQuery(".position-btn").css("bottom", "50px");
    }
  }

  doSearch(navigationService, userPosition, goPosition) {
    let type = 0;
    this.map.clearMap();
    navigationService.search([userPosition.lng, userPosition.lat], [goPosition.lng, goPosition.lat]);
    this.doNavigation(userPosition, goPosition, type)
  }

  doNavigation(userPosition, goPosition, type) {// 0实时导航,1模拟导航
    this.nativeService.navigation(userPosition, goPosition, type).then(message => {
      debugger;
    });
  }

  go() {
    this.MapBottomWindow = false;
    this.mapLocationIcon(this.MapBottomWindow);
    let that = this;
    let options = {map: that.map};
    let alert = that.alertCtrl.create();
    alert.setTitle('请选择导航方式');
    alert.addInput({
      type: 'radio',
      label: '公交',
      value: '1',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: '驾驶',
      value: '2',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: '步行',
      value: '3',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: '骑行',
      value: '4',
      checked: false
    });
    alert.addButton('否');
    alert.addButton({
      text: '是',
      handler: data => {
        if (data === 1) {
          AMap.service('AMap.Transfer', function () {//回调函数
            if (that.newstPosition.address == '') {
              that.doSearch(new AMap.Transfer(options), that.UserLocation, that.jiexiPosition.location)
            } else {
              that.doSearch(new AMap.Transfer(options), that.UserLocation, that.newstPosition.position);
            }

            //TODO: 使用transfer对象调用公交换乘相关的功能
          })
        } else if (data === 2) {
          AMap.service('AMap.Driving', function () {//回调函数
            if (that.newstPosition.address == '') {
              that.doSearch(new AMap.Driving(options), that.UserLocation, that.jiexiPosition.location)
            } else {
              that.doSearch(new AMap.Driving(options), that.UserLocation, that.newstPosition.position);
            }

            // //TODO: 使用driving对象调用驾车路径规划相关的功能
          })
        } else if (data === 3) {
          AMap.service('AMap.Walking', function () {//回调函数
            if (that.newstPosition.address == '') {
              that.doSearch(new AMap.Walking(options), that.UserLocation, that.jiexiPosition.location)
            } else {
              that.doSearch(new AMap.Walking(options), that.UserLocation, that.newstPosition.position);
            }
            //TODO: 使用walking对象调用步行路径规划相关的功能
          })
        } else {
          AMap.service('AMap.Riding', function () {//回调函数
            if (that.newstPosition.address == '') {
              that.doSearch(new AMap.Riding(options), that.UserLocation, that.jiexiPosition.location)
            } else {
              that.doSearch(new AMap.Riding(options), that.UserLocation, that.newstPosition.position);
            }
            //TODO: 使用Riding对象调用骑行相关的功能
          })
        }
      }
    });
    alert.present();
  }

}
