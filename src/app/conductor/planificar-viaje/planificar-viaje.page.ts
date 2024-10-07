import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-planificar-viaje',
  templateUrl: './planificar-viaje.page.html',
  styleUrls: ['./planificar-viaje.page.scss'],
})
export class PlanificarViajePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }


  goBack() {
    this.navCtrl.navigateForward('/c-home');
  }
}
