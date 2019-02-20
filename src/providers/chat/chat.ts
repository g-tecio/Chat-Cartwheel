import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';


@Injectable()
export class ChatProvider {

  contact:any;
  messages:Observable<any>
  chats: Array<any> = [];
  chatsQuery: Observable<any>;

  constructor(public db: AngularFirestore) {
    console.log('Hello ChatProvider Provider');
  }

  initializeChat(contact){
    this.contact = contact;
    this.db.collection<any>('chats').add({
      type: 'personal',
      user_id: firebase.auth().currentUser.uid,
      recipient_id: contact.id
    })
  }

  addMessage(message: string, res){
    var promise = new Promise((resolve, reject) => {
      this.db.collection<any>('messages').add({
        sentBy: firebase.auth().currentUser.uid,
        message: message,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        chat_id: res.id
      }).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getAllMessage(chat){
    var promise = new Promise((resolve) => {
      this.messages = this.db.collection<any>('messages', ref => ref.where('chat_id', '==', chat.id)).valueChanges();
    })
    return promise;
  }

  getChats(){
    let user = firebase.auth().currentUser;
    let recipientRef = this.db.collection('chats', ref => ref.where('recipient_id', '==', user.uid)).valueChanges();
    let userRef = this.db.collection('chats', ref => ref.where('user_id', '==', user.uid)).valueChanges();
    return combineLatest(recipientRef, userRef);
  }

}
