import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalImageProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-image-profile',
  templateUrl: 'modal-image-profile.html'
})
export class ModalImageProfileComponent {

  user: any;

  constructor(
    public statusBar: StatusBar,
    public navParms: NavParams,
    public viewCtrl: ViewController
  ) {
    this.user = this.navParms.get('_userProfile');
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
