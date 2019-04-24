import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// 支付宝功能
// import {  Alipay,AlipayOrder } from '@ionic-native/alipay';

// declare let Wechat: any;  // 此处声明plugin.xml中clobbers对应的值
// declare let Alipay: any;
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html'
})

export class PayPage {


  PayNumber;
  // payInfo={
  //   "seller":"18588643446",//卖家支付宝账户
  //   "subject":"测试支付",//商品名称
  //   "body":"测试支付宝支付",//商品详情
  //   "price":this.PayNumber,//金额 ，单位为RMB
  //   "tradeNo":"1111111",//唯一订单号
  //   "timeout":"10s",//超时设置
  //   "notifyUrl":"localhost:8080"
  // };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams)

  }

  ionViewDidLoad() {
    this.PayNumber=this.navParams.data;
    console.log('ionViewDidLoad PayPage');
  }

  MarkSureWX(){
    alert('测试用');
    // Wechat.isInstalled(function (installed) {
    //    let params = {
    //          mch_id: '18588643446', // merchant id
    //          prepay_id: 'wx201411101639507cbf6ffd8b0779950874', // 从服务器返回的还款ID；
    //          nonce: '1add1a30ac87aa2db72f57a2375d8fec', // 从服务器返回的nonce字符串
    //          timestamp: '14395313641212', // 时间戳
    //          sign: '0CB01533B8C1EF103065174F50BCA001', // 签名字符串
    //      };
    //    Wechat.sendPaymentRequest(params, function () {
    //          alert("Success");
    //      }, function (reason) {
    //          alert("Failed: " + reason);
    //      });
    // }, function (reason) {
    //   alert("Failed: " + reason);
    // });
  }
  MarkSureZFB(){

    alert('测试用')
    // let alipayOrder= {
    //   "seller" : "18588643446",//卖家支付宝账户
    //   "subject":"测试支付",//商品名称
    //   "body":"测试支付宝支付",//商品详情
    //   "price":this.PayNumber,//金额 ，单位为RMB
    //   "tradeNo":"1111111",//唯一订单号
    //   "timeout":"10s",//超时设置
    //   "notifyUrl":"localhost:8080"
    // };
    // this.alipay.pay(alipayOrder)
    //   .then(result =>{
    //     alert(result)
    //   })
    //   .catch(error => {
    //     alert(error); // Failed
    //   })
  }
}
