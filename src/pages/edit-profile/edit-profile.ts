import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ActionSheetController, LoadingController } from 'ionic-angular';

import { ProfilePage } from './../profile/profile';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { Camera, CameraOptions } from '@ionic-native/camera';

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
    public camera: Camera,
    private loaderCtrl: LoadingController
    ) {
      this.menuCtrl.enable(false, 'myMenu')
      this.user = this.navParams.get('_user');
  }

  takePhoto(){
    let loader = this.loaderCtrl.create({
      content: 'Uploading picture'
    })
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      targetWidth: 250,
      targetHeight: 250,
      saveToPhotoAlbum: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      loader.present();
      const refStorage = this.storage.ref(`ProfileImages/${this.user.id}`);
      refStorage.putString(imageData, 'base64', { contentType: 'image/jpeg' }).then((imageURL) => {
        imageURL.ref.getDownloadURL().then(imgURL => {
          console.log(imgURL);
          this.user.profile_picture = imgURL;
          this.db.doc<any>('users/' + this.user.id).update({
            profile_picture: imgURL
          }).then(() => {
            loader.dismiss();
          })
        }) 
      });
    }, (err) => {
      console.log(err);
    })
  }

  getImage(){
    let loader = this.loaderCtrl.create({
      content: 'Uploading picture'
    })
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 250,
      targetHeight: 250,
      allowEdit: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      loader.present();
      const refStorage = this.storage.ref(`ProfileImages/${this.user.id}`);
      refStorage.putString(imageData, 'base64', { contentType: 'image/jpeg' }).then((imageURL) => {
        imageURL.ref.getDownloadURL().then(imgURL => {
          console.log(imgURL);
          this.user.profile_picture = imgURL;
          this.db.doc<any>('users/' + this.user.id).update({
            profile_picture: imgURL
          }).then(() => {
            loader.dismiss();
          })
        }) 
      });
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
