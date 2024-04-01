import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CartComponent } from './cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule] // Add CommonModule to imports
})
export class CartModule { }
