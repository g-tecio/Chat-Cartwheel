import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthProvider {

  public user: firebase.User;

  constructor(
    public afAuth: AngularFireAuth, 
    private db: AngularFirestore
    ) {
      this.afAuth.authState.subscribe(usr => {
        this.user = usr;
      })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
            let _user = {
                id_user: res.user.uid,
                username: value.username,
                name: value.name,
                email: value.email
            }
            this.db.collection<any>('users').add(_user)
            resolve(res);
        }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
            resolve(res);
        }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
        if(firebase.auth().currentUser){
            this.afAuth.auth.signOut();
            resolve();
        }
        else {
            reject();
        }
    });
  }

  getAllUser(){
    return new Promise((resolve) => {
      this.db.collection<any>('users').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).subscribe(userList => {
         resolve(userList)
      })
    })
  }
}
