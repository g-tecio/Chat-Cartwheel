import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IndexPage } from '../pages/index';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { GroupPage } from './../pages/group/group';
import { CreateGroupPage } from './../pages/create-group/create-group';
import { ProfilePage } from './../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ViewProfilePage } from './../pages/view-profile/view-profile';
import { HomePage } from '../pages/home/home';
import { ContactsPage } from './../pages/contacts/contacts';
import { ChatPage } from './../pages/chat/chat';
import { MediaChatPage } from './../pages/media-chat/media-chat';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from "@ionic-native/camera/";
import { Network } from "@ionic-native/network";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireStorageModule } from "angularfire2/storage";
import { environment } from './../environments/environment';

import { AuthProvider } from '../providers/auth/auth';
import { ChatProvider } from '../providers/chat/chat';

import { PopoverChatComponent } from './../components/popover-chat/popover-chat';
import { ModalImageComponent } from './../components/modal-image/modal-image';
import { ModalImageChatComponent } from './../components/modal-image-chat/modal-image-chat';
import { ModalImageProfileComponent } from './../components/modal-image-profile/modal-image-profile';
import { ModalImageContactsComponent } from './../components/modal-image-contacts/modal-image-contacts';
import { ModalImageMediaComponent } from './../components/modal-image-media/modal-image-media';


@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    LoginPage,
    RegisterPage,
    GroupPage,
    CreateGroupPage,
    ProfilePage,
    ViewProfilePage,
    EditProfilePage,
    HomePage,
    ContactsPage,
    ChatPage,
    MediaChatPage,
    TabsPage,
    PopoverChatComponent,
    ModalImageComponent,
    ModalImageChatComponent,
    ModalImageProfileComponent,
    ModalImageContactsComponent,
    ModalImageMediaComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    LoginPage,
    RegisterPage,
    GroupPage,
    CreateGroupPage,
    ProfilePage,
    ViewProfilePage,
    EditProfilePage,
    HomePage,
    ContactsPage,
    ChatPage,
    MediaChatPage,
    TabsPage,
    PopoverChatComponent,
    ModalImageComponent,
    ModalImageChatComponent,
    ModalImageProfileComponent,
    ModalImageContactsComponent,
    ModalImageMediaComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    ChatProvider
  ]
})
export class AppModule {}
