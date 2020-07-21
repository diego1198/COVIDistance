import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';

import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { switchMap }from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public user$: Observable<User>;

  constructor(private authEmail: AngularFireAuth, private afs:AngularFirestore) { 
    this.user$ = this.authEmail.authState.pipe(
      switchMap((user)=>{
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null)
      })
    )
  }

  async logout():Promise<void>{
    try {
      await this.authEmail.signOut();
    } catch (error) {
      console.log('Error -->',error)
    }
  }

  async login(email:string ,password:string ): Promise<User>{
    try {
      const { user } = await this.authEmail.signInWithEmailAndPassword(email,password);
      this.updateUserData(user)
      return user;
    } catch (error) {
      console.log('error: ',error)
    }
  }

  async register(email:string ,password:string): Promise<User>{
    try {
      const { user } = await this.authEmail.createUserWithEmailAndPassword(email,password)
      await this.sendVerificationEmail()
      return user;
    } catch (error) {
      console.log('error: ',error)
    }
  }

  async sendVerificationEmail(): Promise<void>{
    try {
      return (await this.authEmail.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('error: ',error)
    }
  }

  isEmailVerified(user:User):boolean{
    return user.emailVerified === true ? true : false;
  }

  async resetPassword(email): Promise<void>{
    try {
      return this.authEmail.sendPasswordResetEmail(email,)
    } catch (error) {
      console.log('error: ',error)
    }
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

  

}
