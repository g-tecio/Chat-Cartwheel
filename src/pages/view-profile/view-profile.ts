import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalImageComponent } from './../../components/modal-image/modal-image';


@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {

  recipient:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController
    ) {
      this.recipient = this.navParams.get('_recipient');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
  }

  openImageView(){
    let imageView = this.modalCtrl.create(ModalImageComponent, {
      _user: this.recipient
    })
    imageView.present();
  }

}
