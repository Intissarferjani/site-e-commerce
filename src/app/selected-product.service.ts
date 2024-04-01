import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class SelectedProductService {
  private selectedProducts: Product[] = [];

  constructor() { }

  addToCart(product: Product): void {
    console.log('Produit ajouté au panier :', product);
    this.selectedProducts.push(product);
    console.log('Produits dans le panier :', this.selectedProducts);
  }

  removeFromCart(product: Product): void {
    const index = this.selectedProducts.indexOf(product);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
      console.log('Produit retiré du panier :', product);
      console.log('Produits dans le panier :', this.selectedProducts);
    } else {
      console.log('Le produit n\'existe pas dans le panier :', product);
    }
  }

  getItems(): Product[] {
    return this.selectedProducts;
  }
}
