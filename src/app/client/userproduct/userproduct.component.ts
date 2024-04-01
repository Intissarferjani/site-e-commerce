// userproduct.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';
import { SelectedProductService } from 'src/app/selected-product.service';

@Component({
  selector: 'app-userproduct',
  templateUrl: './userproduct.component.html',
  styleUrls: ['./userproduct.component.css']
})
export class UserproductComponent implements OnInit {
  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService, private selectedProductService: SelectedProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product) {
    this.router.navigate(['/user/cart']);
  }
}
