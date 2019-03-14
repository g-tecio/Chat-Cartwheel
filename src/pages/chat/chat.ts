import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, MenuController, ActionSheetController, PopoverController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { ViewProfilePage } from './../view-profile/view-profile';

import * as firebase from 'firebase/app';

import { ChatProvider } from './../../providers/chat/chat';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { PopoverChatComponent } from '../../components/popover-chat/popover-chat';

import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild('content') content: Content;
  user_id: any;
  user: any;
  newMessage: any;
  chat: any;
  allMessages:Observable<any>;
  recipient: any;
  showProfile: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public camera: Camera,
    public popOverCtrl: PopoverController,
    public chatProvider: ChatProvider,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    ) {
      this.user_id = firebase.auth().currentUser.uid;

      this.chat = this.navParams.get('_chat');
      this.scrollTo();
      this.allMessages = this.chatProvider.getAllMessage(this.chat);

    this.firestore.collection('users/', ref => ref.where('id_user', '==', this.user_id)).valueChanges().subscribe(res => {
      this.user = res[0];
    })

    let user_recipient = (this.chat.recipient_id == this.user_id) ? this.chat.user_id : this.chat.recipient_id;

    this.firestore.collection('users/', ref => ref.where('id_user', '==', user_recipient)).valueChanges().subscribe(res => {
      this.recipient = res[0];
    });

  }

  addMessage(){
    let message = {
      text: this.newMessage
    }
    this.chatProvider.addMessage(message, this.chat.id).then(() => {
      this.newMessage = '';
      this.content.scrollToBottom();
    })
  }

  ionViewWillLeave(){
    this.showProfile = false;
  }

  scrollTo(){
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

  ionViewCanEnter(){
    this.showProfile = true;
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'myMenu');
  }

  deleteMessage(_message){
    this.chatProvider.deleteMessage(_message);
  }

  alertMessage(_message){
    let messageAlert = (_message.message.text) ? _message.message.text:"Image";
    const alertMessage = this.alertCtrl.create({
      title: 'Are you want to delete this message?',
      message: `Delete ${messageAlert}`,
      buttons: [
        {
          text: 'Disagree',
          role: 'cancel'
        },
        {
          text: 'Agree',
          handler: () => {
            this.deleteMessage(_message);
          }
        }
      ]
    })
    alertMessage.present();
  }

  openSheetChat(){
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Send a photo',
          icon: 'image',
          handler: () => {
            this.getImage();
          }
        },
        {
          text: 'Document',
          icon: 'document',
          handler: () => {

          }
        }
      ]
    })
    actionSheet.present();
  }

  openPopOverChat(myEvent){
    let popOver = this.popOverCtrl.create(PopoverChatComponent);
    popOver.present({
      ev: myEvent
    })
    popOver.onDidDismiss(popOverData => {
      console.log(popOverData);
    })
  }

  takePhoto(){
    let time = new Date().getTime();
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
      const refStorage = this.storage.ref(`MessagesIMG/${this.user.id} with ${this.recipient.id}/${time}`);
      refStorage.putString(imageData, 'base64', { contentType: 'image/jpeg' }).then((imageURL) => {
        imageURL.ref.getDownloadURL().then(imgURL => {
          let messageIMG = {
            image: imgURL
          }
          this.chatProvider.addMessage(messageIMG, this.chat.id).then(() => {
            this.newMessage = '';
            this.content.scrollToBottom();
          })
        }) 
      });
    }, (err) => {
      console.log(err);
    })
  }

  getImage(){
    let time = new Date().getTime();
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 250,
      targetHeight: 250,
      allowEdit: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      const refStorage = this.storage.ref(`MessagesIMG/${this.user.id} with ${this.recipient.id}/${time}`);
      refStorage.putString(imageData, 'base64', { contentType: 'image/jpeg' }).then((imageURL) => {
        imageURL.ref.getDownloadURL().then(imgURL => {
          let messageIMG = {
            image: imgURL
          }
          this.chatProvider.addMessage(messageIMG, this.chat.id).then(() => {
            this.newMessage = '';
            this.content.scrollToBottom();
          })
        }) 
      });
    }, (err) => {
      console.log(err);
    })
  }

  viewProfile(){
    this.navCtrl.push(ViewProfilePage, {
      _recipient: this.recipient
    })
  }
}
