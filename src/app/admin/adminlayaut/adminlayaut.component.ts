import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';
import { SearchService } from 'src/app/search.service'; // Assurez-vous que cette ligne est correcte

@Component({
  selector: 'app-adminlayaut',
  templateUrl: './adminlayaut.component.html',
  styleUrls: ['./adminlayaut.component.css']
})
export class AdminlayautComponent implements OnInit {
  searchQuery: string = '';
  
  constructor(private productService: ProductService, private searchResultsService: SearchService) { } // Assurez-vous que SearchService est injecté ici

  ngOnInit(): void {}

  searchProduct(): void {
    if (this.searchQuery.trim() !== '') {
      this.productService.searchProducts(this.searchQuery.trim()).subscribe(
        (results: Product[]) => {
          this.searchResultsService.updateSearchResults(results);
        },
        (error: any) => {
          console.error('Error searching products:', error);
        }
      );
    } else {
      this.searchResultsService.updateSearchResults([]);
    }
  }
}
