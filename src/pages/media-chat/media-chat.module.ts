import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediaChatPage } from './media-chat';

@NgModule({
  declarations: [
    MediaChatPage,
  ],
  imports: [
    IonicPageModule.forChild(MediaChatPage),
  ],
})
export class MediaChatPageModule {}
