import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { AuthProvider } from './../../providers/auth/auth';
import { ChatProvider } from './../../providers/chat/chat';


@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  temparr = [];
  filteredUsers = [];
  currentUser:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFirestore,
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
    this.chatProvider.initializeChat(contact);
    //this.navCtrl.push(ChatPage);
  }

}
