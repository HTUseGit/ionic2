import { Component ,ViewChild,ElementRef } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
/**
 * Generated class for the HomeGamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-home-game',
  templateUrl: 'home-game.html'
})
export class HomeGamePage {
  @ViewChild('selectable') selectable:ElementRef;
  gameMore: boolean = false ;
  AnchorFirstNameMore: boolean = false ;
  constructor(public navCtrl: NavController, public navParams: NavParams
                ,private tts: TextToSpeech) {

  }

  ionViewDidLoad() {
    console.log(this.selectable.nativeElement);//这个就是取出来的元素本身咯  Dom类型的
    console.log(this.selectable.nativeElement.innerText)
  }
  gameMoreClick() {
    this.gameMore = !this.gameMore ;
  }
  AnchorFirstNameClick() {
    this.AnchorFirstNameMore = !this.AnchorFirstNameMore ;
  }
  textSpeake() {
    let TextElement = this.selectable.nativeElement;
    this.tts.speak(TextElement.innerText)
      .then(() => alert('Success'))
      .catch((reason: any) =>console.log(reason));
  }
  textStopSpeake() {
    this.tts.stop();
  }
}
