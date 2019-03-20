import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MediaChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-media-chat',
  templateUrl: 'media-chat.html',
})
export class MediaChatPage {

  mediaTypes: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mediaTypes = "images";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaChatPage');
  }

}
