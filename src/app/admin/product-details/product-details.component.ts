import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: string = '';
  errorMessage: string = '';
  product: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    imageUrl: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.productService.getProductById(this.productId).subscribe(
      (product: Product | null) => {
        if (product) {
          this.product = product;
        } else {
          // Gérer le cas où le produit n'est pas trouvé
        }
      },
      (error: any) => {
        console.error('Error getting product:', error);
        this.errorMessage = error.message || 'An error occurred while getting the product.';
      }
    );
  }

  updateProduct(): void {
    this.productService.updateProduct(this.productId, this.product).subscribe(
      () => {
        console.log('Product updated successfully!');
        this.router.navigate(['/admin/product']);
      },
      (error: any) => {
        console.error('Error updating product:', error);
        this.errorMessage = error.message || 'An error occurred while updating the product.';
      }
    );
  }
}
