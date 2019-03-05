import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';


import { EditProfilePage } from '../edit-profile/edit-profile';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthProvider,
    public db: AngularFirestore,
    public menuCtrl: MenuController
    ) {
    this.authService.afAuth.authState.subscribe(user =>{
      if(user){
        this.db.collection<any>('users', ref => ref.where('email', '==', user.email)).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).subscribe(userList => {
          this.user = userList[0];
        })
      }
    })
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true, 'myMenu');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  editProfile(){
    this.navCtrl.push(EditProfilePage, {
      _user: this.user,
    });
  }

}
