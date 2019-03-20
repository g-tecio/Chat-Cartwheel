import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the ModalImageContactsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-image-contacts',
  templateUrl: 'modal-image-contacts.html'
})
export class ModalImageContactsComponent {

  users: any;

  constructor(
    statusBar: StatusBar,
    public navParms: NavParams,
    public viewCtrl: ViewController
  ) {
    statusBar.backgroundColorByHexString('#000');
    this.users = this.navParms.get('_filterUser');
  }

  closeImageModal(){
    this.viewCtrl.dismiss();
  }

}
