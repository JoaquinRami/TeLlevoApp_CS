import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-p-viaje',
  templateUrl: './p-viaje.page.html',
  styleUrls: ['./p-viaje.page.scss'],
})
export class PViajePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateForward('/buscar-viaje');
  }

  QR() {
    this.navCtrl.navigateForward('/p-qr');
  }

}
