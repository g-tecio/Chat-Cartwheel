import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthProvider } from './../../providers/auth/auth';

import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

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
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]))
    });
  }

  tryRegister(value){
    if(value.confirmPassword === value.password){
      let loader = this.loadingCtrl.create({
        content: 'Creating account...',
        spinner: 'crescent',
        duration: 4000
      });
      loader.present();
      this.authService.doRegister(value)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Your account has been created successfully", res;
        loader.dismiss();
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = "";
      })
    } else {
      this.errorMessage = "Confirm your password."
    }
  }

  goLoginPage(){
    this.navCtrl.setRoot(LoginPage);
  }

}
