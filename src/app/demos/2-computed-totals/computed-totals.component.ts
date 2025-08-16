import { Component, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-computed-totals',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <label>Price:
      <input type="number" [value]="price()" (input)="price.set($any($event.target).valueAsNumber || 0)" />
    </label>

    <label style="margin-left:1rem;">Qty:
      <input type="number" [value]="qty()" (input)="qty.set($any($event.target).valueAsNumber || 1)" />
    </label>

    <label style="margin-left:1rem;">
      <input type="checkbox" [checked]="isMember()" (change)="isMember.set($any($event.target).checked)" />
      Member (10% off)
    </label>

    <p style="margin-top:.75rem;">
      Subtotal: <strong>{{ subtotal() | currency }}</strong><br/>
      Discount: <strong>{{ discount() | currency }}</strong><br/>
      Total: <strong>{{ total() | currency }}</strong>
    </p>
  `
})
export class ComputedTotalsComponent {
  price = signal(50);
  qty = signal(1);
  isMember = signal(false);

  subtotal = computed(() => this.price() * this.qty());
  discount = computed(() => this.isMember() ? this.subtotal() * 0.10 : 0);
  total = computed(() => this.subtotal() - this.discount());
}
