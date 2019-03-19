import { Component } from '@angular/core';
import { Platform, LoadingController, App, ModalController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { TabsPage } from '../pages/tabs/tabs';
import { IndexPage } from '../pages/index';
import { AuthProvider } from '../providers/auth/auth';

import { ContactsPage } from './../pages/contacts/contacts';
import { timer } from 'rxjs/observable/timer';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;
  showSplash = true;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public app: App,
    public modalCtrl: ModalController,
    public toast: ToastController,
    private auth: AuthProvider,
    public loadingCtrl: LoadingController,
    private network: Network
    ) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString('#56477C');

      timer(3000).subscribe(() => {
        this.showSplash = false;
      })
      
      this.auth.afAuth.authState.subscribe((user) => {
        if(user){
          this.rootPage = TabsPage;
          splashScreen.hide();
        } else {
          this.rootPage = IndexPage;
          splashScreen.hide();
        }
      })

      this.network.onConnect().subscribe(() => {
        this.toast.create({
          message: 'You are online',
          duration: 3000
        }).present();
      })

      this.network.onDisconnect().subscribe(() => {
        this.toast.create({
          message: 'You are offline',
          duration: 3000
        }).present();
      })
    });
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
