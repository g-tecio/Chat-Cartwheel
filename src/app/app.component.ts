import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { IndexPage } from '../pages/index';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IndexPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private auth: AuthProvider,
    public loadingCtrl: LoadingController
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.auth.afAuth.authState.subscribe((user) => {
      this.rootPage = (user) ? TabsPage : IndexPage;
    })
  }

  logout(){
    let loader = this.loadingCtrl.create({
      content: 'Log-out account.',
      spinner: 'crescent',
      duration: 4000
    });
    loader.present();
    this.auth.doLogout().then(() => {
      loader.dismiss();
      console.log('Session log-out');
    }, (err) => {
      console.log('Log-Out', err);
    })
  }
}
