import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items; // Retourner les éléments inchangés si la liste ou le terme de recherche est vide
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      // Appliquer le filtre sur chaque élément en vérifiant si le nom contient le terme de recherche
      return item.name.toLowerCase().includes(searchText);
    });
  }
}
