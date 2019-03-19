import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-image',
  templateUrl: 'modal-image.html'
})
export class ModalImageComponent {

  user: any;

  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  }

  constructor(public viewCtrl: ViewController, public navPrms: NavParams) {
    this.user = this.navPrms.get('_user');
  }

  closeImageModal(){
    this.viewCtrl.dismiss();
  }

}
