import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { ProfilePage } from './../profile/profile';

import { AngularFirestore } from 'angularfire2/firestore';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFirestore,
    public menuCtrl: MenuController
    ) {
      this.menuCtrl.enable(false, 'myMenu')
      this.user = this.navParams.get('_user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  updateProfile(){
    console.log(this.user);
    this.db.doc<any>('users/' + this.user.id).update(this.user).then(()=>{
      this.navCtrl.setRoot(ProfilePage);
    });
  }

}
