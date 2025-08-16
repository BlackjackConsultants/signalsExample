import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterComponent } from './demos/1-component-state/counter.component';
import { ComputedTotalsComponent } from './demos/2-computed-totals/computed-totals.component';
import { SideEffectsComponent } from './demos/3-side-effects/side-effects.component';
import { RenderOptimizationDemoComponent } from './demos/4-render-optimization/render-optimization-demo.component';
import { ProductsListComponent } from './demos/5-shared-store/products-list.component';
import { CartSummaryComponent } from './demos/5-shared-store/cart-summary.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CounterComponent,
    ComputedTotalsComponent,
    SideEffectsComponent,
    RenderOptimizationDemoComponent,
    ProductsListComponent,
    CartSummaryComponent
  ],
  template: `
    <div class="container" style="max-width:1000px;margin:2rem auto;display:grid;gap:2rem;">
      <h1>Angular Signals – Practical Use Cases</h1>

      <section style="border:1px solid #ddd;padding:1rem;border-radius:12px;">
        <h2>1) Component State (local)</h2>
        <app-counter></app-counter>
      </section>

      <section style="border:1px solid #ddd;padding:1rem;border-radius:12px;">
        <h2>2) Derived / Computed State</h2>
        <app-computed-totals></app-computed-totals>
      </section>

      <section style="border:1px solid #ddd;padding:1rem;border-radius:12px;">
        <h2>3) Side Effects</h2>
        <app-side-effects></app-side-effects>
      </section>

      <section style="border:1px solid #ddd;padding:1rem;border-radius:12px;">
        <h2>4) UI Re-render Optimization</h2>
        <app-render-optimization-demo></app-render-optimization-demo>
      </section>

      <section style="border:1px solid #ddd;padding:1rem;border-radius:12px;">
        <h2>5) Shared Store (small/medium app replacement for heavy state libs)</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <app-products-list></app-products-list>
          <app-cart-summary></app-cart-summary>
        </div>
      </section>
    </div>
  `
})
export class AppComponent {}
