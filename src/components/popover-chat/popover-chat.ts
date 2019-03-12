import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverChatComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-chat',
  templateUrl: 'popover-chat.html'
})
export class PopoverChatComponent {

  items:any;
  text: string;

  constructor(
    public viewCtrl: ViewController
  ) {
    this.items = [
      {item: 'View Profile'},
      {item: 'Media'}
    ]
  }

  itemsClick(item){
    this.viewCtrl.dismiss(item);
  }

}
