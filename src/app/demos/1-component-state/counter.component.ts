// Angular Signals Demo: Component State Management
// This example demonstrates basic signal usage, computed values, and reactive state
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Counter Component - Angular Signals Example
 * 
 * Demonstrates:
 * - Basic signal creation and updates
 * - Computed signals that derive values from other signals
 * - Conditional logic based on signal state
 * - Event handling with proper TypeScript typing
 */
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Counter controls: buttons only work when enabled -->
    <button (click)="decrement()">-</button>
    <strong style="margin:0 1rem;">{{ count() }}</strong>
    <button (click)="increment()">+</button>

    <!-- Computed signal demonstration - automatically updates when count changes -->
    <p style="margin-top:.5rem;">Even? {{ isEven() ? 'Yes' : 'No' }}</p>

    <!-- Toggle to enable/disable counter functionality -->
    <label style="display:block;margin-top:.5rem;">
      <input type="checkbox" [checked]="enabled()" (change)="toggleEnabled($event)" />
      Enabled
    </label>

    <!-- Status display based on enabled signal -->
    <p>Status: <em>{{ enabled() ? 'active' : 'disabled' }}</em></p>
  `
})
export class CounterComponent {
  // Writable signal: holds the counter value, starts at 0
  count = signal(0);
  
  // Writable signal: controls whether the counter is active
  enabled = signal(true);
  
  // Computed signal: automatically recalculates when count() changes
  // This demonstrates reactive programming - no manual updates needed
  isEven = computed(() => this.count() % 2 === 0);

  /**
   * Increments the counter by 1
   * Only works when the component is enabled
   */
  increment() { 
    if (this.enabled()) {
      // signal.update() takes a function that receives current value
      this.count.update(v => v + 1);
    }
  }

  /**
   * Decrements the counter by 1
   * Only works when the component is enabled
   */
  decrement() { 
    if (this.enabled()) {
      // signal.update() is preferred over signal.set() for state transformations
      this.count.update(v => v - 1);
    }
  }

  /**
   * Toggles the enabled state based on checkbox input
   * Demonstrates proper event handling with TypeScript type safety
   */
  toggleEnabled(event: Event) { 
    // Type assertion to access the 'checked' property safely
    const target = event.target as HTMLInputElement;
    // signal.set() directly assigns a new value
    this.enabled.set(target.checked); 
  }
}
