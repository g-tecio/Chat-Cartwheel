import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, ModalController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { AuthProvider } from './../../providers/auth/auth';

import { ModalImageContactsComponent } from './../../components/modal-image-contacts/modal-image-contacts';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { map } from 'rxjs/operators';

/**
 * Generated class for the CreateGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {

  chatGroup: any;
  temparr = [];
  filteredUsers = [];
  currentUser: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    private loaderCtrl: LoadingController,
    public modalCtrl: ModalController,
    public authService: AuthProvider,
    public storage: AngularFireStorage,
    public db: AngularFirestore
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

  openSheetNewGroup(){
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

  getImage(){
    let loader = this.loaderCtrl.create({
      content: 'Uploading picture'
    })
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 250,
      targetHeight: 250,
      allowEdit: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      loader.present();
      const refStorage = this.storage.ref(`ImageGroup/${this.chatGroup.id}`);
      refStorage.putString(imageData, 'base64', { contentType: 'image/jpeg' }).then((imageURL) => {
        imageURL.ref.getDownloadURL().then(imgURL => {
          console.log(imgURL);
          this.chatGroup.profile_picture = imgURL;
          this.db.doc<any>('users/' + this.chatGroup.id).update({
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

  takePhoto(){
    let loader = this.loaderCtrl.create({
      content: 'Uploading picture'
    })
    const options: CameraOptions = {
      quality: 100,
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
      const refStorage = this.storage.ref(`ProfileImages/${this.chatGroup.id}`);
      refStorage.putString(imageData, 'base64', { contentType: 'image/jpeg' }).then((imageURL) => {
        imageURL.ref.getDownloadURL().then(imgURL => {
          console.log(imgURL);
          this.chatGroup.profile_picture = imgURL;
          this.db.doc<any>('users/' + this.chatGroup.id).update({
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

  openModalContacts(user){
    let imageView = this.modalCtrl.create(ModalImageContactsComponent, {
      _filterUser: user
    })
    imageView.present();
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

}
