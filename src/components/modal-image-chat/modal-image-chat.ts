import { Component } from '@angular/core';
import { ViewController, NavParams, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the ModalImageChatComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-image-chat',
  templateUrl: 'modal-image-chat.html'
})
export class ModalImageChatComponent {

  recipient: any;
  user: any;
  image: any;

  constructor(
    statusBar: StatusBar,
    public viewCtrl: ViewController,
    public navParms: NavParams,
    public actionSheetCtrl: ActionSheetController
  ) {
    statusBar.backgroundColorByHexString('#000');
    this.image = this.navParms.get('image')
    this.recipient = this.navParms.get('_recipient');
    this.user = this.navParms.get('_user');
  }

  closeImageModal(){
    this.viewCtrl.dismiss();
  }

  openActionSheetImage(){
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Save Image',
          icon: 'download',
          handler: () => {

          }
        },
        {
          text: 'Forward to',
          icon: 'share-alt',
          handler: () => {
            
          }
        }
      ]
    })
    actionSheet.present();
  }

}
