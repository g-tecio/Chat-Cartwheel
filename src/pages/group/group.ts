import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Content } from 'ionic-angular';

@Component({
  selector: 'page-group',
  templateUrl: 'group.html'
})
export class GroupPage {

  showSearchbar: boolean = false;
  @ViewChild('contentGroups') content: Content;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController
    ) {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLeave(){
    this.showSearchbar = false;
  }

  createNewGroup(){
    
  }

  toggleGroups(){
    this.showSearchbar = !this.showSearchbar;
    this.content.resize();
  }

}
