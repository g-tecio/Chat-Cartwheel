import { Component } from '@angular/core';
import { Platform, LoadingController, App, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { IndexPage } from '../pages/index';
import { AuthProvider } from '../providers/auth/auth';

import { ContactsPage } from './../pages/contacts/contacts';
import { timer } from 'rxjs/observable/timer';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = IndexPage;

  showSplash = true;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public app: App,
    public modalCtrl: ModalController,
    private auth: AuthProvider,
    public loadingCtrl: LoadingController
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      timer(3000).subscribe(() => {
        this.showSplash = false;
      })
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

  toContacts() {
    this.app.getActiveNav().push(ContactsPage);
  }
}
