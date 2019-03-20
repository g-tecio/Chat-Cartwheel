import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content, Platform, ModalController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { AuthProvider } from './../../providers/auth/auth';
import { ChatProvider } from './../../providers/chat/chat';
import { ChatPage } from '../chat/chat';
import { HomePage } from '../home/home';
import { ModalImageContactsComponent } from './../../components/modal-image-contacts/modal-image-contacts';

import { Subscription } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  temparr = [];
  filteredUsers = [];
  currentUser:any;
  showSearchbar: boolean = false;
  subscription: Subscription;
  @ViewChild('content') content: Content;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public db: AngularFirestore,
    public platform: Platform,
    public authService: AuthProvider,
    public menuCtrl: MenuController,
    public chatProvider: ChatProvider
    ) {
      this.currentUser = this.authService.afAuth.auth.currentUser.email;
      this.db.collection<any>('users').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).subscribe(userList => {
         this.filteredUsers = userList.slice();
         this.temparr = userList.slice();
      })
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'myMenu');
  }

  toggleBar(){
    this.showSearchbar = !this.showSearchbar;
    if(this.platform.is('ios')){
      this.content.resize();
    }
  }

  searchUser(searchBar){
    this.filteredUsers = this.temparr;
    var q = searchBar.target.value;
    if(q.trim() == ''){
      return;
    }
    this.filteredUsers = this.filteredUsers.filter((v) => {
      if(v.username.toLowerCase().indexOf(q.toLowerCase()) > -1){
        return true;
      }
      return false; 
    })
  }

  openChat(contact){
    let currentUserID = this.authService.afAuth.auth.currentUser.uid;
    this.subscription = this.db.collection('chats', ref => ref.where('recipient_id', '==', contact.id_user).where('user_id','==', currentUserID)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(chats => {
      console.log(chats);
       if(chats.length > 0) {
        console.log("lo encontre en la primera");
        this.showSearchbar = false;
        this.navCtrl.push(ChatPage, {
          _chat: chats[0]
        })
       } else {
        this.db.collection('chats', ref => ref.where('user_id', '==', contact.id_user).where('recipient_id','==', currentUserID)).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).subscribe(chats => {
          console.log(chats);
           if(chats.length > 0) {
            console.log("lo encontre en la segunda");
            this.showSearchbar = false;
            this.navCtrl.push(ChatPage, {
              _chat: chats[0]
            })
           } else {
            console.log("no lo encontre");
            this.chatProvider.initializeChat(contact);
            this.navCtrl.setRoot(HomePage).then(() => this.subscription.unsubscribe());
           }
        })
       }
    });
  }

  openModalContacts(user){
    let imageView = this.modalCtrl.create(ModalImageContactsComponent, {
      _filterUser: user
    })
    imageView.present();
  }

}
