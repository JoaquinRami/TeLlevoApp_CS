import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }


  goBack() {
    this.navCtrl.navigateForward('/viaje');
  }

}
