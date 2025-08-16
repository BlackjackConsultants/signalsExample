import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-effects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label>Theme:
      <select [value]="theme()" (change)="theme.set($any($event.target).value)">
        <option value="light">light</option>
        <option value="dark">dark</option>
        <option value="system">system</option>
      </select>
    </label>

    <p>Open your console to see effect logs, and refresh to see persistence.</p>
  `
})
export class SideEffectsComponent {
  theme = signal<'light' | 'dark' | 'system'>('system');

  constructor() {
    // Load from localStorage on init
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('demo_theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        this.theme.set(saved);
      }
    }

    // Persist & log whenever theme changes
    effect(() => {
      const current = this.theme();
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo_theme', current);
        document.title = `Signals Demo – Theme: ${current}`;
      }
      console.log('[effect] theme changed to', current);
    });
  }
}
