import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="decrement()">-</button>
    <strong style="margin:0 1rem;">{{ count() }}</strong>
    <button (click)="increment()">+</button>

    <p style="margin-top:.5rem;">Even? {{ isEven() ? 'Yes' : 'No' }}</p>

    <label style="display:block;margin-top:.5rem;">
      <input type="checkbox" [checked]="enabled()" (change)="toggleEnabled($event)" />
      Enabled
    </label>

    <p>Status: <em>{{ enabled() ? 'active' : 'disabled' }}</em></p>
  `
})
export class CounterComponent {
  count = signal(0);
  enabled = signal(true);
  isEven = computed(() => this.count() % 2 === 0);

  increment() { if (this.enabled()) this.count.update(v => v + 1); }
  decrement() { if (this.enabled()) this.count.update(v => v - 1); }
  toggleEnabled(event: Event) { 
    const target = event.target as HTMLInputElement;
    this.enabled.set(target.checked); 
  }
}
