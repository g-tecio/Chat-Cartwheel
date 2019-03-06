import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, AlertController, Content, Platform } from 'ionic-angular';

import { ContactsPage } from './../contacts/contacts';
import { ChatPage } from './../chat/chat';

import { ChatProvider } from './../../providers/chat/chat';
import { AngularFirestore } from 'angularfire2/firestore';

import firebase from 'firebase';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chats: Array<any>;
  user_id: any;
  chats_ready: boolean = false;
  recipient: any;
  showSearchbar: boolean = false;
  temparr: Array<any> = [];
  filteredChats: Array<any> = [];
  @ViewChild('contentHome') content: Content;
  

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public chatProvider: ChatProvider,
    private firestore: AngularFirestore
  ) {
    this.user_id = firebase.auth().currentUser.uid;
    this.chatProvider.getChats().subscribe(chat => {
      console.log(chat);
      this.chats = chat[1].slice();
      this.chats = this.chats.concat(chat[0]);
      this.filteredChats = this.chats.slice();
      this.temparr = this.chats.slice();
      this.chats.forEach(chat => {
        let user_recipient = (chat.recipient_id == this.user_id) ? chat.user_id : chat.recipient_id;
  
        this.firestore.collection('users/', ref => ref.where('id_user', '==', user_recipient)).valueChanges().subscribe(res => {
          this.recipient = chat.user = res[0];
        });
      })
      this.chats_ready = true;
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLeave(){
    this.showSearchbar = false;
  }

  openContacts() {
    this.navCtrl.push(ContactsPage);
  }

  openChat(_chat) {
    console.log(_chat)
    this.showSearchbar = false;
    this.navCtrl.push(ChatPage, {
      _chat: _chat
    })
  }

  deleteChatHome(_chat){
    this.chatProvider.deleteChat(_chat);
  }

  toggleHome(){
    this.showSearchbar = !this.showSearchbar;
    if(this.platform.is('ios')){
      this.content.resize();
    }
  }

  chatAlert(_chat){
    const alertChat = this.alertCtrl.create({
      title: 'Are you want to delete this chat?',
      message: `Delete chat with ${_chat.user.username}`,
      buttons: [
        {
          text: 'Disagree',
          role: 'cancel'
        },
        {
          text: 'Agree',
          handler: () => {
            this.deleteChatHome(_chat);
          }
        }
      ]
    })
    alertChat.present();
  }

  searchChat(searchBar){
    this.filteredChats = this.temparr;
    var q = searchBar.target.value;
    if(q.trim() == ''){
      return;
    }
    this.filteredChats = this.filteredChats.filter((v) => {
      if(v.user.username.toLowerCase().indexOf(q.toLowerCase()) > -1){
        return true;
      }
      return false; 
    })
  }

}
