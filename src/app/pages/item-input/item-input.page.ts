import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  IonContent, IonList, IonItem, IonInput, IonButton,
  IonSelect, IonSelectOption, IonThumbnail, IonIcon,
  AlertController, LoadingController, Platform
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-input',
  templateUrl: './item-input.page.html',
  styleUrls: ['./item-input.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
    IonContent, IonList, IonItem, IonInput, IonButton,
    IonSelect, IonSelectOption, IonThumbnail, IonIcon
  ]
})
export class ItemInputPage implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  itemForm!: FormGroup;
  photoPreview: string | null = null;
  photoFile: Blob | null = null;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.itemForm = new FormGroup({
      nama_item: new FormControl('', Validators.required),
      scan_code: new FormControl('', Validators.required),
      item_condition: new FormControl('Baru'),
      permendagri_code: new FormControl(''),
      photo: new FormControl(null)
    });
  }

  // 🔹 Ambil foto dari kamera atau file explorer
  async ambilFoto() {
    if (this.platform.is('hybrid')) {
      // 📱 Mode aplikasi mobile
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt
        });

        if (image?.webPath) {
          this.photoPreview = image.webPath;
          this.photoFile = await this.uriToBlob(image.webPath);
          this.itemForm.patchValue({ photo: 'photo_placeholder' });
        }
      } catch (error) {
        console.error('Error mengambil foto:', error);
        this.showAlert('Gagal', 'Tidak dapat mengakses kamera atau galeri.');
      }
    } else {
      // 💻 Mode browser
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.photoFile = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.photoPreview = e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  private async uriToBlob(uri: string): Promise<Blob> {
    const response = await fetch(uri);
    return await response.blob();
  }

  async simpanItem() {
    if (this.itemForm.invalid) {
      this.showAlert('Gagal', 'Mohon lengkapi semua data wajib.');
      return;
    }

    const loading = await this.loadingController.create({ message: 'Menyimpan...' });
    await loading.present();

    const formData = new FormData();
    formData.append('nama_item', this.itemForm.value.nama_item);
    formData.append('scan_code', this.itemForm.value.scan_code);
    formData.append('item_condition', this.itemForm.value.item_condition);
    formData.append('permendagri_code', this.itemForm.value.permendagri_code);

    if (this.photoFile) {
      formData.append('itemPhoto', this.photoFile, `photo-${Date.now()}.jpg`);
    }

    this.itemService.addItem(formData).subscribe({
      next: async () => {
        await loading.dismiss();
        this.showAlert('Sukses', 'Barang berhasil disimpan!', () => {
          this.itemForm.reset();
          this.photoPreview = null;
          this.photoFile = null;
        });
      },
      error: async (err: any) => {
        await loading.dismiss();
        console.error('Error simpan item:', err);
        const message = err.error?.message || err.message || 'Gagal menyimpan barang. Coba lagi.';
        this.showAlert('Gagal', message);
      }
    });
  }

  async showAlert(header: string, message: string, handler?: () => void) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [{ text: 'OK', handler }],
    });
    await alert.present();
  }
}
