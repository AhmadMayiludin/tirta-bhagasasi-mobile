// FILE: src/main.ts (SUDAH DILENGKAPI DENGAN IKON TAB BAR)

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

// --- BAGIAN PENTING DIMULAI DI SINI ---
import { addIcons } from 'ionicons';
import {
  // Ikon yang sudah ada:
  logOutOutline,
  timeOutline,
  barChartOutline,
  calendarClearOutline,
  notificationsOutline,
  documentTextOutline, // Mungkin tidak terpakai lagi? Tapi tidak apa-apa
  calendarOutline,     // Mungkin tidak terpakai lagi? Tapi tidak apa-apa
  lockClosedOutline,

  // --- 1. TAMBAHKAN IMPOR IKON TAB BAR DI SINI ---
  homeOutline,
  addCircleOutline,
  scanOutline,
  listOutline,
  settingsOutline
  // --- SELESAI MENAMBAHKAN IMPOR ---

} from 'ionicons/icons';
// --- BAGIAN PENTING SELESAI DI SINI ---

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({}),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
  ],
});

// --- 2. TAMBAHKAN NAMA IKON DI FUNGSI addIcons DI SINI ---
addIcons({
  // Ikon yang sudah ada:
  logOutOutline,
  timeOutline,
  barChartOutline,
  calendarClearOutline,
  notificationsOutline,
  documentTextOutline,
  calendarOutline,
  lockClosedOutline,

  // Ikon Tab Bar:
  homeOutline,
  addCircleOutline,
  scanOutline,
  listOutline,
  settingsOutline
});
// --- SELESAI MENAMBAHKAN ---
