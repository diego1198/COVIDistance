import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from '../shared/user.interface';
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'


@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private googleAuth:AngularFireAuth,private afs:AngularFirestore) { }

  async loginGoogle(): Promise<User>{
    const {user} = await this.googleAuth.signInWithPopup(new auth.GoogleAuthProvider());
    this.updateUserData(user)
    return user;
  }

  private updateUserData(user:User){
    const userRef:AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data:User ={
      uid:user.uid,
      email:user.email,
      emailVerified:user.emailVerified,
      displayName: user.displayName,
    };

    return userRef.set(data,{merge:true})
  }

  isEmailVerified(user:User):boolean{
    return user.emailVerified === true ? true : false;
  }
  

}
