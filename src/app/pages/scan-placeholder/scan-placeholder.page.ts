import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-scan-placeholder',
  templateUrl: './scan-placeholder.page.html',
  styleUrls: ['./scan-placeholder.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ScanPlaceholderPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
