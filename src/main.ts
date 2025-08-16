import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    // Coalesce events for fewer change detection passes (works great with signals)
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
});
