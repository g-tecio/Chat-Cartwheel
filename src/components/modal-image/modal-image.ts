import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@Component({
  selector: 'modal-image',
  templateUrl: 'modal-image.html'
})
export class ModalImageComponent {

  user: any;

  constructor(
    public statusBar: StatusBar,
    public viewCtrl: ViewController, 
    public navPrms: NavParams
    ) {
      this.user = this.navPrms.get('_user');
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
