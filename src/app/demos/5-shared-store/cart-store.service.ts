import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem, Product } from './cart-types';

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly _items = signal<CartItem[]>([]);
  // Expose readonly signals for consumers
  readonly items = this._items.asReadonly();

  readonly count = computed(() => this._items().reduce((n, it) => n + it.qty, 0));
  readonly total = computed(() => this._items().reduce((sum, it) => sum + it.price * it.qty, 0));

  constructor() {
    // hydrate
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('cart_items');
      if (raw) {
        try { this._items.set(JSON.parse(raw)); } catch { /* ignore */ }
      }
    }
    // persist
    effect(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart_items', JSON.stringify(this._items()));
      }
    });
  }

  add(p: Product) {
    this._items.update(list => {
      const idx = list.findIndex(i => i.id === p.id);
      if (idx >= 0) {
        const next = [...list];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...list, { ...p, qty: 1 }];
    });
  }

  removeOne(productId: number) {
    this._items.update(list =>
      list.flatMap(i => i.id !== productId ? [i] : (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []))
    );
  }

  clear() { this._items.set([]); }
}
