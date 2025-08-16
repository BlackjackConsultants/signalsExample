import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartStore } from './cart-store.service';
import { Product } from './cart-types';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <h3>Products</h3>
    <ul>
      <li *ngFor="let p of products">
        {{ p.name }} – <strong>{{ p.price | currency }}</strong>
        <button (click)="cart.add(p)">Add</button>
      </li>
    </ul>
  `
})
export class ProductsListComponent {
  cart = inject(CartStore);

  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Headphones', price: 199 }
  ];
}
