import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  selectedCategory: string = '';
  products: Product[] = [];
  currentProduct: Product = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    imageUrl: '',
    id: undefined
  };
  currentIndex = -1;
searchTerm: any;
  searchResults: Product[] = [];

  constructor(private productService: ProductService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }
 
  // Fonction pour effectuer la recherche de produits
  searchProduct(): void {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.productService.searchProducts(this.searchTerm.trim()).subscribe(
        (results: Product[]) => {
          this.products = results;
        },
        (error: any) => {
          console.error('Error searching products:', error);
        }
      );
    } else {
      this.retrieveProducts(); // Recharger tous les produits si la recherche est vide
    }
  }

  retrieveProducts(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  

  filterProductsByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === '') {
      this.retrieveProducts();
    } else {
      this.products = this.products.filter(product => product.category === category);
    }
  }
// Fonction pour récupérer tous les produits depuis le service ProductService


  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = { name: '', description: '', price: 0, quantity: 0, category: '', imageUrl: '', id: undefined };
    this.currentIndex = -1;
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  removeAllProducts(): void {
    this.productService.deleteAll().then(() => {
      this.refreshList();
    }).catch((err: any) => console.log(err));
  }

  deleteProduct(key: string): void {
    this.productService.deleteProduct(key).then(() => {
      this.refreshList();
    }).catch((err: any) => console.log(err));
  }

  editProduct(productId: string | null | undefined): void {
    if (productId) {
      this.router.navigate(['/admin/edit', productId]);
    } else {
      console.error('Invalid product ID.');
    }
  }
  
  
}
