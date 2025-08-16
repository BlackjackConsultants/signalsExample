import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartStore } from './cart-store.service';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <h3>Cart</h3>
    <p>Items: <strong>{{ cart.count() }}</strong> | Total: <strong>{{ cart.total() | currency }}</strong></p>
    <table *ngIf="cart.items().length" style="width:100%;">
      <thead><tr><th style="text-align:left;">Item</th><th>Qty</th><th>Price</th><th></th></tr></thead>
      <tbody>
        <tr *ngFor="let it of cart.items()">
          <td>{{ it.name }}</td>
          <td style="text-align:center;">{{ it.qty }}</td>
          <td style="text-align:right;">{{ (it.price * it.qty) | currency }}</td>
          <td><button (click)="cart.removeOne(it.id)">-1</button></td>
        </tr>
      </tbody>
    </table>
    <button (click)="cart.clear()" [disabled]="!cart.items().length">Clear Cart</button>
  `
})
export class CartSummaryComponent {
  cart = inject(CartStore);
}
