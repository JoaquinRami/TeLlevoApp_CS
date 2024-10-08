import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-c-mis-viajes',
  templateUrl: './c-mis-viajes.page.html',
  styleUrls: ['./c-mis-viajes.page.scss'],
})
export class CMisViajesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateForward('/c-home');
  }
}
