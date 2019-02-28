import { ChatPage } from './../chat/chat';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { ContactsPage } from './../contacts/contacts';

import { ChatProvider } from './../../providers/chat/chat';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chats: Array<any>;
  allChats = [];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public chatProvider: ChatProvider
    ) {
      this.chatProvider.getChats().subscribe(chat => {
        console.log(chat);
        this.chats = chat[1].slice();
        this.chats = this.chats.concat(chat[0]);
      });

  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'myMenu');
  }

  openContacts(){
    this.navCtrl.push(ContactsPage)
  }

  openChat(_chat){
    console.log(_chat)
    this.navCtrl.push(ChatPage, {
      _chat: _chat
    })
  }

}
