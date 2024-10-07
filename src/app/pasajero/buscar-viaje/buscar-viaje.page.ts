import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  viaje() {
    this.navCtrl.navigateForward('/p-viaje');
  }


  goBack() {
    this.navCtrl.navigateForward('/p-home');
  }

  
}
