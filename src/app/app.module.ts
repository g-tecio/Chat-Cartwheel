import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IndexPage } from '../pages/index';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ProfilePage } from './../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { HomePage } from '../pages/home/home';
import { ContactsPage } from './../pages/contacts/contacts';
import { ChatPage } from './../pages/chat/chat';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { environment } from './../environments/environment';

import { AuthProvider } from '../providers/auth/auth';
import { ChatProvider } from '../providers/chat/chat';


@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    LoginPage,
    RegisterPage,
    AboutPage,
    ProfilePage,
    EditProfilePage,
    HomePage,
    ContactsPage,
    ChatPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    LoginPage,
    RegisterPage,
    AboutPage,
    ProfilePage,
    EditProfilePage,
    HomePage,
    ContactsPage,
    ChatPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    ChatProvider
  ]
})
export class AppModule {}
