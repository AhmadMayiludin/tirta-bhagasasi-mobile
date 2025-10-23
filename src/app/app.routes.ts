// FILE: src/app/app.routes.ts (VERSI FINAL YANG BENAR UNTUK STRUKTUR TAB)

import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rute Awal: Arahkan ke login jika belum login
  {
    path: '',
    redirectTo: 'login', // Default ke login
    pathMatch: 'full',
  },
  // Rute untuk halaman login (di luar tab)
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
  },
  // Rute untuk halaman register (di luar tab)
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.page').then( m => m.RegisterPage)
  },
  // Rute Utama untuk Halaman-halaman yang Punya Tab Bawah
  {
    path: 'tabs', // Alamat dasar untuk semua halaman tab
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage), // Muat komponen 'pembungkus' tab
    children: [ // Halaman-halaman yang ada di dalam tab
      {
        path: 'home', // Jika URL-nya '/tabs/home'
        // PASTIKAN PATH INI BENAR ke folder halaman home-mu
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'item-input', // Jika URL-nya '/tabs/item-input'
        // PASTIKAN PATH INI BENAR
        loadComponent: () => import('./pages/item-input/item-input.page').then( m => m.ItemInputPage)
      },
      {
        path: 'scan', // Jika URL-nya '/tabs/scan'
        // PASTIKAN PATH INI BENAR
        loadComponent: () => import('./pages/scan-placeholder/scan-placeholder.page').then( m => m.ScanPlaceholderPage)
      },
      {
        path: 'history', // Jika URL-nya '/tabs/history'
        // PASTIKAN PATH INI BENAR
        loadComponent: () => import('./pages/history/history.page').then( m => m.HistoryPage)
      },
      {
        path: 'settings', // Jika URL-nya '/tabs/settings'
        // PASTIKAN PATH INI BENAR
        loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
      },
      {
        // Jika hanya '/tabs', arahkan ke tab 'home' sebagai default
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
   // (Opsional tapi direkomendasikan) Arahkan /home lama ke /tabs/home
   {
      path: 'home', // Jika ada yang coba akses /home langsung
      redirectTo: '/tabs/home', // Arahkan ke alamat tab yang benar
      pathMatch: 'full'
   }
];
