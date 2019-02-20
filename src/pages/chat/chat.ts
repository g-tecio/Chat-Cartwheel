import { ChatProvider } from './../../providers/chat/chat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  contact:any;
  newMessage: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider
    ) {
      this.contact = this.chatProvider.contact;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  /*addMessage(){
    this.chatProvider.addMessage(this.newMessage).then(() => {
      this.newMessage = '';
    })
  }*/

}
