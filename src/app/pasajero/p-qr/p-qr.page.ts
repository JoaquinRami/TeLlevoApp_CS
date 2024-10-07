import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-p-qr',
  templateUrl: './p-qr.page.html',
  styleUrls: ['./p-qr.page.scss'],
})
export class PQrPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateForward('/p-viaje');
  }

}
