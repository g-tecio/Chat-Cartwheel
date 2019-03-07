import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { AuthProvider } from './../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  errorMessage: string = '';


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthProvider,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController
    ) {
      this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewWillLoad(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ])),
    });
  }

  tryLogin(value){
    if(value.email && value.password){
      let loader = this.loadingCtrl.create({
        content: 'Log-in account',
        spinner: 'crescent',
        duration: 4000
      })
      this.authService.doLogin(value)
      .then(res => {
        if(res){
          loader.present();
          console.log(res);
        }
        loader.dismiss();
      }, err => {
        this.errorMessage = err.message;
        console.log(err);
      })
    }
  }

  goRegisterPage(){
    this.navCtrl.setRoot(RegisterPage);
  }

}
