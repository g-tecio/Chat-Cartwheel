import { ChatPage } from './../chat/chat';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { ContactsPage } from './../contacts/contacts';

import { ChatProvider } from './../../providers/chat/chat';
import { AngularFirestore } from 'angularfire2/firestore';

import firebase from 'firebase';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chats: Array<any>;
  allChats = [];
  recipient: any;
  user_id: any;
  chats_ready: boolean = false;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public chatProvider: ChatProvider,
    private firestore: AngularFirestore
  ) {
    this.user_id = firebase.auth().currentUser.uid;
    this.chatProvider.getChats().subscribe(chat => {
      console.log(chat);
      this.chats = chat[1].slice();
      this.chats = this.chats.concat(chat[0]);

      this.chats.forEach(chat => {
        let user_recipient = (chat.recipient_id == this.user_id) ? chat.user_id : chat.recipient_id;
  
        this.firestore.collection('users/', ref => ref.where('id_user', '==', user_recipient)).valueChanges().subscribe(res => {
          chat.user = res[0];
        });
      })
      this.chats_ready = true;
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'myMenu');
  }

  openContacts() {
    this.navCtrl.push(ContactsPage)
  }

  openChat(_chat) {
    console.log(_chat)
    this.navCtrl.push(ChatPage, {
      _chat: _chat
    })
  }

}
