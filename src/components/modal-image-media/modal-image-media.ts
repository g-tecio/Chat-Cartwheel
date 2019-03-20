import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

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
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.recipient = this.navParams.get('_recipientChat');
    this.image = this.navParams.get('_image');
    console.log(this.recipient);
  }

  closeImageModal(){
    this.viewCtrl.dismiss();
  }
}
