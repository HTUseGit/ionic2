import { Component ,ViewChild} from '@angular/core';
import { Platform,Tabs } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../home/home';
import { FocusOnPage } from '../focusOn/focusOn';
import { LivePage } from '../live/live';
import { MyPage } from '../my/my'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  @ViewChild('mainTabs') tabs:Tabs;//加这句以及引用两个模块
  tab1Root: any = HomePage;
  tab2Root: any = LivePage;
  tab3Root: any = FocusOnPage;
  tab4Root: any = MyPage;
  constructor(platform: Platform,statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.overlaysWebView(false);
      statusBar.show();
      statusBar.backgroundColorByHexString("#4B6C8D");
      splashScreen.hide();

    });
  }
}
