import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { ViewProfilePage } from './../../pages/view-profile/view-profile';
import { MediaChatPage } from './../../pages/media-chat/media-chat';

/**
 * Generated class for the PopoverChatComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-chat',
  templateUrl: 'popover-chat.html'
})
export class PopoverChatComponent {

  items:any;
  recipient: any;
  chat: any;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParms: NavParams
  ) {
    this.recipient = this.navParms.get('recipient');
    this.chat = this.navParms.get('chat')
  }

  viewProfile(){
    this.navCtrl.push(ViewProfilePage, {
      _recipient: this.recipient
    });
    this.viewCtrl.dismiss();
  }

  viewMedia(){
    this.navCtrl.push(MediaChatPage, {
      _chat: this.chat,
      _recipient: this.recipient
    });
    this.viewCtrl.dismiss();
  }

}
