import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { ContactsPage } from './../contacts/contacts';

import { ChatProvider } from './../../providers/chat/chat';
import { Observable } from 'rxjs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chats: Observable<any>;
  allChats = [];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public chatProvider: ChatProvider
    ) {
      this.menuCtrl.enable(false, 'myMenu')
      this.chats = this.chatProvider.getChats();
      this.chats.subscribe(chat => {
        console.log(chat);
      });

  }

  openContacts(){
    this.navCtrl.push(ContactsPage)
  }

}
