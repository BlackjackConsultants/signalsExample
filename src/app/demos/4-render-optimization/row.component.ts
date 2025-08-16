import { ChangeDetectionStrategy, Component, EventEmitter, Output, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Item { id: number; name: string; liked: boolean; }

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="display:flex;align-items:center;gap:.5rem;">
      <span>#{{ item().id }}</span>
      <strong>{{ item().name }}</strong>
      <button (click)="toggle.emit()">Like: {{ item().liked ? '♥' : '♡' }}</button>
    </div>
  `
})
export class RowComponent {
  // Signal-based input (required)
  item = input.required<Item>();

  @Output() toggle = new EventEmitter<void>();

  constructor() {
    // Log when this row's input changes – you'll see only the affected rows log
    effect(() => {
      const it = this.item();
      // eslint-disable-next-line no-console
      console.log('[Row re-evaluated]', it.id, it.liked);
    });
  }
}
