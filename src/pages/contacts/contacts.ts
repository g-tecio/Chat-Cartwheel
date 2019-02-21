import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { ChatProvider } from './../../providers/chat/chat';
import { ChatPage } from '../chat/chat';

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
    public authService: AuthProvider,
    public menuCtrl: MenuController,
    public chatProvider: ChatProvider
    ) {
      this.currentUser = this.authService.afAuth.auth.currentUser.email;
      this.menuCtrl.enable(false, 'myMenu')

      this.authService.getAllUser().then((res: any) => {
        this.filteredUsers = res;
        this.temparr = res;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
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
