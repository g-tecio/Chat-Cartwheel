import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the ModalImageMediaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-image-media',
  templateUrl: 'modal-image-media.html'
})
export class ModalImageMediaComponent {

  recipient: any;
  image: any;

  constructor(
    public statusBar: StatusBar,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.recipient = this.navParams.get('_recipientChat');
    this.image = this.navParams.get('_image');
  }

  closeImageModal(){
    this.viewCtrl.dismiss();
  }

  ionViewWillEnter(){
    this.statusBar.backgroundColorByHexString('#000');
  }

  ionViewWillLeave(){
    this.statusBar.backgroundColorByHexString('#56477C');
  }
}
