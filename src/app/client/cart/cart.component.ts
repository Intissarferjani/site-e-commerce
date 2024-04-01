import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;

  constructor(private cartService: ProductService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems(); // Get cart items from service
    this.calculateTotal(); // Optional: Calculate total cost
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0); // Consider quantity
  }

  // Additional methods for removing items, updating quantities, etc.
}
