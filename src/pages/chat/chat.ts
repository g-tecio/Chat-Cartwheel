import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';

import { ChatProvider } from './../../providers/chat/chat';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild('content') content: Content;
  user_id: any;
  user: any;
  newMessage: any;
  chat: any;
  allMessages:Observable<any>;
  recipient: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public chatProvider: ChatProvider,
    private firestore: AngularFirestore
    ) {
      this.user_id = firebase.auth().currentUser.uid;

      this.chat = this.navParams.get('_chat');
      this.scrollTo();
      this.allMessages = this.chatProvider.getAllMessage(this.chat);

    this.firestore.collection('users/', ref => ref.where('id_user', '==', this.user_id)).valueChanges().subscribe(res => {
      this.user = res[0];
    })

    let user_recipient = (this.chat.recipient_id == this.user_id) ? this.chat.user_id : this.chat.recipient_id;

    this.firestore.collection('users/', ref => ref.where('id_user', '==', user_recipient)).valueChanges().subscribe(res => {
      this.recipient = res[0];
    });

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

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'myMenu');
  }

}
