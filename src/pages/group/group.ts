import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Content, Platform } from 'ionic-angular';

import { CreateGroupPage } from './../create-group/create-group';

@Component({
  selector: 'page-group',
  templateUrl: 'group.html'
})
export class GroupPage {

  showSearchbar: boolean = false;
  @ViewChild('contentGroups') content: Content;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public platform: Platform
    ) {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLeave(){
    this.showSearchbar = false;
  }

  createNewGroup(){
    this.navCtrl.push(CreateGroupPage);
  }

  toggleGroups(){
    this.showSearchbar = !this.showSearchbar;
    if(this.platform.is('ios')){
      this.content.resize();
    }
  }

}
