import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage // Injectez AngularFireStorage
  ) {}

  getImageUrl(): Observable<string> {
    return new Observable<string>((observer) => {
      const ref = this.storage.ref('path/to/image'); // Remplacez 'path/to/image' par le chemin de votre image dans Firestore
      ref.getDownloadURL().subscribe((url: string) => {
        observer.next(url);
        observer.complete();
      });
    });
  }
  
  addImage(imageUrl: string) {
    return this.firestore.collection('images').add({ url: imageUrl });
  }
}
