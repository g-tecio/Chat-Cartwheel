import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from './../login/login';


@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController
    ) {
    this.menuCtrl.enable(false, 'myMenu');
  }

  signIn() {
  	this.navCtrl.setRoot(LoginPage);
  }

  register() {
  	this.navCtrl.setRoot(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

}
