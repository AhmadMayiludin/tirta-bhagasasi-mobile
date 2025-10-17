import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// 1. TAMBAHKAN RouterModule DI SINI
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  AlertController,
  LoadingController
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // 2. DAFTARKAN RouterModule DI SINI
    RouterModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonList, IonItem, IonInput, IonButton
  ]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      nama: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  async register() {
    if (this.registerForm.invalid) { return; }

    const loading = await this.loadingController.create({ message: 'Mendaftarkan...' });
    await loading.present();

    this.authService.register(this.registerForm.value).subscribe({
      next: async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Sukses',
          message: 'Pendaftaran berhasil! Silakan login.',
          buttons: ['OK'],
        });
        await alert.present();
        this.router.navigateByUrl('/login');
      },
      error: async (err) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Gagal',
          message: err.error.message || 'Terjadi kesalahan saat mendaftar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }
}
