import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private promotionsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.promotionsRef = this.db.list('/promotions');
  }

  getPromotions(): Observable<any[]> {
    return this.promotionsRef.valueChanges();
  }

  addPromotion(promotion: any): Observable<void> {
    return new Observable((observer) => {
      this.promotionsRef.push(promotion)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  updatePromotion(key: string, updates: any): Observable<void> {
    return new Observable((observer) => {
      this.promotionsRef.update(key, updates)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  deletePromotion(key: string): Observable<void> {
    return new Observable((observer) => {
      this.promotionsRef.remove(key)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
