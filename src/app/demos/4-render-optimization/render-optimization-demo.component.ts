import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowComponent, Item } from './row.component';

@Component({
  selector: 'app-render-optimization-demo',
  standalone: true,
  imports: [CommonModule, RowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="shuffle()">Shuffle (reorders array)</button>
    <button (click)="add()">Add item</button>

    <p>Total items: {{ items().length }} | Liked: {{ likedCount() }}</p>

    <ul>
      <li *ngFor="let it of items(); trackBy: trackById">
        <app-row [item]="it" (toggle)="toggleLike(it.id)"></app-row>
      </li>
    </ul>
  `
})
export class RenderOptimizationDemoComponent {
  private seed = 6;
  items = signal<Item[]>(Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, name: `Item ${i + 1}`, liked: false
  })));

  likedCount = signal(0); // keep it simple here; recompute on toggle

  trackById = (_: number, it: Item) => it.id;

  toggleLike(id: number) {
    this.items.update(list =>
      list.map(it => it.id === id ? { ...it, liked: !it.liked } : it)
    );
    // recompute liked count
    this.likedCount.set(this.items().filter(i => i.liked).length);
  }

  shuffle() {
    const arr = [...this.items()];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor((Math.sin(i + this.seed++) + 1) / 2 * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.items.set(arr);
  }

  add() {
    const nextId = this.items().length + 1;
    this.items.update(list => [...list, { id: nextId, name: `Item ${nextId}`, liked: false }]);
  }
}
