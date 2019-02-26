import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';

import { ChatProvider } from './../../providers/chat/chat';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild('content') content: Content;
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
      this.scrollTo();
      this.allMessages = this.chatProvider.getAllMessage(this.chat);
      this.allMessages.subscribe((res) => {
        console.log(res);
    })
  }

  addMessage(){
    this.chatProvider.addMessage(this.newMessage, this.chat.id).then(() => {
      this.newMessage = '';
      this.content.scrollToBottom();
    })
  }

  scrollTo(){
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

}
