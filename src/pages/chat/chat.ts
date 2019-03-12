import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, MenuController, ActionSheetController, PopoverController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { ViewProfilePage } from './../view-profile/view-profile';

import * as firebase from 'firebase/app';

import { ChatProvider } from './../../providers/chat/chat';
import { AngularFirestore } from 'angularfire2/firestore';

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
    public camera: Camera,
    public popOverCtrl: PopoverController,
    public chatProvider: ChatProvider,
    private firestore: AngularFirestore,
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
    this.chatProvider.addMessage(this.newMessage, this.chat.id).then(() => {
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
      
    })
  }

  getImage(){
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 250,
      targetHeight: 250,
      allowEdit: true,
    }

    this.camera.getPicture(options).then((imageData) => {

    })
  }

  viewProfile(){
    this.navCtrl.push(ViewProfilePage, {
      _recipient: this.recipient
    })
  }
}
