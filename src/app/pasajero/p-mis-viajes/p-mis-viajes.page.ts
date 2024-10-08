import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-p-mis-viajes',
  templateUrl: './p-mis-viajes.page.html',
  styleUrls: ['./p-mis-viajes.page.scss'],
})
export class PMisViajesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateForward('/p-home');
  }

}
