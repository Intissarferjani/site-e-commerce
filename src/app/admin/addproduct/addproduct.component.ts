import { Component } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    imageUrl: undefined
  };

  imageFile: File | null = null;

  constructor(private productService: ProductService) { }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  addProduct() {
    if (this.product.name && this.product.description && this.product.price && this.imageFile) {
      this.productService.addProduct(this.product, this.imageFile)
        .then(() => {
          console.log('Product added successfully!');
          this.product = { name: '', description: '', price: 0, quantity: 0, category: '', imageUrl: '' };
          this.imageFile = null;
        })
        .catch(error => {
          console.error('Error adding product: ', error);
        });
    } else {
      console.error('All fields are required!');
    }
  }
}
