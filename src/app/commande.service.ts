import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private commandsCollection: AngularFirestoreCollection<any>;
  commands: Observable<any[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.commandsCollection = this.afs.collection<any>('commands');
    this.commands = this.commandsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getCommands(): Observable<any[]> {
    return this.commands;
  }

  addCommand(command: any): Promise<any> {
    return this.commandsCollection.add(command);
  }

  deleteCommand(id: string): Promise<void> {
    return this.commandsCollection.doc(id).delete();
  }
}
