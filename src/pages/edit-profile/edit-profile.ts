import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ActionSheetController } from 'ionic-angular';

import { ProfilePage } from './../profile/profile';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';





@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user:any;
  userPicture:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public db: AngularFirestore,
    public storage: AngularFireStorage,
    public menuCtrl: MenuController,
    public camera: Camera
    ) {
      this.menuCtrl.enable(false, 'myMenu')
      this.user = this.navParams.get('_user');
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.userPicture = 'data:image/jpeg;base64' + imageData;
    }, (err) => {
      console.log(err);
    })
  }

  getImage(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.userPicture = 'data:image/jpeg;base64' + imageData;
    }, (err) => {
      console.log(err);
    })
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

  openSheetCamera(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            this.getImage();
          }
        }
      ]
    })
    actionSheet.present();
  }

}
