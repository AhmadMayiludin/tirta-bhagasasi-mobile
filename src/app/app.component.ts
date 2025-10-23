import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'; // Pastikan ini di-import

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html', // Pastikan nama file ini benar
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet], // Pastikan ini ada
})
export class AppComponent {
  constructor() {}
}
