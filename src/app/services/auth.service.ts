import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // 1. Import HttpHeaders
import { Observable, tap } from 'rxjs'; // 2. Import tap

// 3. Ganti URL API agar sesuai dengan server Node.js-mu
const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Tempat menyimpan token sementara di dalam service
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  // FUNGSI LOGIN (SUDAH DIMODIFIKASI)
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${API_URL}/login`, credentials).pipe(
      // "Mengintip" respon dari API jika berhasil
      tap((response: any) => {
        // Jika responnya ada dan berisi token
        if (response && response.token) {
          this.token = response.token; // Simpan token ke dalam service
          // Simpan juga di memori HP (localStorage) agar tidak hilang
          localStorage.setItem('authToken', this.token!);
        }
      })
    );
  }

  // FUNGSI REGISTER (Tetap sama, hanya URL disesuaikan)
  register(userData: any): Observable<any> {
    return this.http.post(`${API_URL}/register`, userData);
  }

  // FUNGSI BARU: Untuk mengambil data profil user
  getUserProfile(): Observable<any> {
    // Jika token di service kosong, coba ambil dari localStorage
    if (!this.token) {
      this.token = localStorage.getItem('authToken');
    }

    // Jika tetap tidak ada token, batalkan permintaan (akan dibahas nanti)
    if (!this.token) {
        // Mengembalikan Observable kosong atau error
        return new Observable(observer => observer.error('No token found'));
    }

    // Buat "surat izin" (header) yang berisi token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    // Kirim permintaan ke API sambil menunjukkan "surat izin"
    return this.http.get(`${API_URL}/user-profile`, { headers: headers });
  }

  // FUNGSI BARU: Untuk logout
  logout() {
    this.token = null; // Hapus token dari service
    localStorage.removeItem('authToken'); // Hapus token dari memori HP
  }
}
