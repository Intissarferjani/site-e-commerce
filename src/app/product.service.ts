import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getCartItems(): Product[] {
    throw new Error('Method not implemented.');
  }
  private selectedProductSource = new BehaviorSubject<Product | null>(null);
  selectedProduct$ = this.selectedProductSource.asObservable();

 

  setSelectedProduct(product: Product) {
    this.selectedProductSource.next(product);
  }

  private productsCollection: AngularFirestoreCollection<Product>;


  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.productsCollection = this.firestore.collection<Product>('products');
  }
  // Méthode pour récupérer les données des produits à partir de Firestore
  getProducts(): Observable<any[]> {
    return this.firestore.collection('products').valueChanges();
  }

  // Méthode pour récupérer l'URL de l'image à partir de Firebase Storage
  getImageUrl(imagePath: string): Observable<string | null> {
    return this.storage.ref(imagePath).getDownloadURL();
  }
  searchProducts(query: string): Observable<Product[]> {
    // Effectuer une requête de recherche sur la collection de produits en filtrant par le nom
    return this.firestore.collection<Product>('products', ref =>
      ref.where('name', '>=', query)
    ).valueChanges();
  }

  getAllProducts(): Observable<Product[]> {
    return this.productsCollection.valueChanges({ idField: 'id' });
  }

 // Dans le service ProductService
// Dans le service ProductService
getProductById(productId: string): Observable<Product | null> {
  return this.productsCollection.doc<Product>(productId).valueChanges().pipe(
    map(product => product || null)
  );
}
  addProduct(product: Product, imageFile: File): Promise<void> {
    const filePath = `product_images/${imageFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, imageFile);

    return new Promise<void>((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            product.imageUrl = downloadURL;
            this.productsCollection.add(product)
              .then(() => {
                resolve();
              })
              .catch(error => {
                reject(error);
              });
          });
        })
      ).subscribe();
    });
  }

  updateProduct(productId: string, data: any): Observable<void> {
    return from(this.productsCollection.doc(productId).update(data));
  }
  
  deleteProduct(productId: string): Promise<void> {
    return this.productsCollection.doc(productId).delete();
  }

  deleteAll(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.productsCollection.get().toPromise()
        .then(snapshot => {
          if (snapshot) {
            const batch = this.firestore.firestore.batch();
            snapshot.docs.forEach(doc => batch.delete(doc.ref));
            return batch.commit();
          } else {
            throw new Error('Snapshot is undefined');
          }
        })
        .then(() => resolve())
        .catch(error => reject(error));
    });
  }


 
}
