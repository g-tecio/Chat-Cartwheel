import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('slider') slider: Slides;
  page = 0;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ProfilePage;

  constructor() {
  }

  selectedTab(index){
    this.slider.slideTo(index);
  }


}
