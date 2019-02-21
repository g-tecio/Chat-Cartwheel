import { ChatProvider } from './../../providers/chat/chat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  user: any;
  newMessage: any;
  chat: any;
  allMessages:Observable<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider,
    ) {
      this.user = firebase.auth().currentUser.uid;
      this.chat = this.navParams.get('_chat');
      

      //console.log(this.contact);

      this.allMessages = this.chatProvider.getAllMessage(this.chat);
      this.allMessages.subscribe((res) => {
        console.log(res);
      })
  }

  ionViewDidLoad() {
  }

  addMessage(){
    this.chatProvider.addMessage(this.newMessage, this.chat.id).then(() => {
      this.newMessage = '';
    })
  }

}
