import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


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
      recipient_id: contact.id_user
    })
  }

  addMessage(message: string, chat_id){
    var promise = new Promise((resolve, reject) => {
      this.db.collection<any>('messages').add({
        sentBy: firebase.auth().currentUser.uid,
        message: message,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        chat_id: chat_id
      }).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getAllMessage(chat){
    this.messages = this.db.collection<any>('messages', ref => ref.where('chat_id', '==', chat.id).orderBy('timeStamp')).valueChanges();
    return this.messages;
  }

  getChats(){
    let user = firebase.auth().currentUser;
    console.log(user.uid);
    let recipientRef = this.db.collection('chats', ref => ref.where('recipient_id', '==', user.uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
    let userRef = this.db.collection('chats', ref => ref.where('user_id', '==', user.uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return combineLatest(recipientRef, userRef);
  }

}