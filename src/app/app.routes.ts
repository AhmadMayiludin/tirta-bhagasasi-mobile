// FILE: src/app/app.routes.ts (VERSI FINAL YANG BENAR)

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Halaman pertama yang dibuka adalah login
    pathMatch: 'full',
  },
  {
    path: 'home',
    // Cara baru: Memuat halaman hanya saat dibutuhkan
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    // Cara baru untuk halaman login
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    // Cara baru untuk halaman register (INI YANG PALING PENTING)
    loadComponent: () => import('./auth/register/register.page').then( m => m.RegisterPage)
  },
];
