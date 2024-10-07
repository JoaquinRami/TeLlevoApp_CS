import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  QR(){
    this.navCtrl.navigateForward('/qr');
  }
  goBack() {
    this.navCtrl.navigateForward('/c-home');
  }
}
