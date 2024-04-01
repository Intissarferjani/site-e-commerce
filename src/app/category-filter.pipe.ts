import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/product';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(products: Product[], category: string): Product[] {
    if (!category || category === '') {
      return products; // Retourne tous les produits si aucune catégorie n'est spécifiée
    } else {
      return products.filter(product => product.category === category);
    }
  }
}
