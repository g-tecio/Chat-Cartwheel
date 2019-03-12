import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {

  recipient:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {
      this.recipient = this.navParams.get('_recipient');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
  }

}
