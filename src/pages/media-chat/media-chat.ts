import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ChatProvider } from './../../providers/chat/chat';
import { ModalImageMediaComponent } from './../../components/modal-image-media/modal-image-media';

/**
 * Generated class for the MediaChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-media-chat',
  templateUrl: 'media-chat.html',
})
export class MediaChatPage {

  mediaTypes: any;
  chat: any;
  allMessages: any;
  chatImages: Array<any> = [];
  recipient: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public chatProvider: ChatProvider
    ) {
      this.recipient = this.navParams.get('_recipient');
      console.log(this.recipient);
      this.chat = this.navParams.get('_chat');
      this.mediaTypes = "images";
      this.chatProvider.getAllMessage(this.chat).subscribe(allMessages => {
        allMessages.forEach(item => {
          if(item.message.image) {
            this.chatImages.push(item);
          }
        });
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaChatPage');
  }

  openImageMedia(image?){
    let imageView = this.modalCtrl.create(ModalImageMediaComponent, {
      _image: image,
      _recipientChat: this.recipient
    })
    imageView.present();
  }

}
