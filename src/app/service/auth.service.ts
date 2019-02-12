import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { resolve, reject } from 'q';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( userData => {
        resolve(userData);
        this.updateUserData(userData.user);
        })
      .catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email,password)
      .then(userData => resolve(userData)
      , err => reject(err) );
    });
  }

  loginFacebookUser(){
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  loginGoogleUser(){
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  logoutUser(){
    return this.afsAuth.auth.signOut();
  }

  // Crear un rol de tipo editor
  private updateUserData(user){
    
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        //admin: true
        editor: true
      }
    };
    //console.log('usuariooooo: ', data);return;
    return userRef.set(data, {merge: true});
  }

  isUserAdmin(userUid: string){
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }

}
