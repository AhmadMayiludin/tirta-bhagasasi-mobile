// FILE: src/app/tabs/tabs.page.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon, // <--- PASTIKAN INI DI-IMPORT
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon, // <--- PASTIKAN INI ADA DI SINI
    IonLabel
  ]
})
export class TabsPage {
  constructor() { }
}
