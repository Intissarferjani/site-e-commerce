import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.user = afAuth.authState;
  }

  signUpAndSaveData(email: string, password: string, userData: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        const uid = credential.user?.uid;
        if (uid) {
          // Enregistrer les données dans la base de données
          return this.db.object(`users/${uid}`).set(userData);
        } else {
          // Gérer le cas où l'ID utilisateur n'est pas disponible
          console.error("UID is not available");
          return Promise.reject("Error: UID is not available");
        }
      });
  }



  getUserData(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  logout() {
    return this.afAuth.signOut();
  }

  signup(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          console.log("We've sent you a password reset link");
          resolve();
        })
        .catch(error => reject(error));
    });
  }

  signInUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve();
          // Rediriger l'utilisateur vers la page souhaitée après connexion
          // Ici, vous pouvez définir la redirection en fonction du rôle de l'utilisateur
          if (email === 'admin@gmail.com') {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/user');
          }
        })
        .catch(error => reject(error));
    });
  }

  register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}
