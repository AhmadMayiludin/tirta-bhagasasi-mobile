import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// 1. TAMBAHKAN RouterModule DI SINI
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  AlertController,
  LoadingController
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // 2. DAFTARKAN RouterModule DI SINI
    RouterModule,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton
  ]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }

    const loading = await this.loadingController.create({ message: 'Mohon tunggu...' });
    await loading.present();

    this.authService.login(this.loginForm.value).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      error: async (err) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login Gagal',
          message: err.error.message || 'Email atau password salah.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Lupa Password',
      message: 'Silakan hubungi admin.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
