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
    statusBar: StatusBar,
    public viewCtrl: ViewController, 
    public navPrms: NavParams
    ) {
      statusBar.backgroundColorByHexString('#000');
      this.user = this.navPrms.get('_user');
  }

  closeImageModal(){
    this.viewCtrl.dismiss();
  }

}
