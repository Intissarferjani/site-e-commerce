import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    
})
export class HomeComponent implements OnInit {
  currentSlide = 0;
  interval: any; // Variable pour stocker l'ID de l'intervalle

  

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change de diapositive toutes les 3 secondes

      // Récupérer les données des produits depuis Firebase Firestore
      this.productService.getProducts().subscribe(products => {
        this.products = products;
      });
  }

  ngOnDestroy() {
    // Nettoyer l'intervalle lors de la destruction du composant pour éviter les fuites de mémoire
    clearInterval(this.interval);
  }

  nextSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    slides[this.currentSlide].classList.remove('active');
    this.currentSlide = (this.currentSlide + 1) % slides.length;
    slides[this.currentSlide].classList.add('active');
  }
  products: any[] = [];

  constructor(private productService: ProductService) { }



}


