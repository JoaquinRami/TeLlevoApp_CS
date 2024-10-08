import { BuscarViajePage } from './../buscar-viaje/buscar-viaje.page';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-p-home',
  templateUrl: './p-home.page.html',
  styleUrls: ['./p-home.page.scss'],
})
export class PHomePage implements OnInit {

  usuario:string=""
  
  constructor(private alertController: AlertController,private navCtrl: NavController) { }

  ngOnInit(): void {
    var x=localStorage.getItem("usuario")
    this.usuario=x ?? ''
  }

  async cancelar2() {
    const alert = await this.alertController.create({
      header: 'Cancelar Viaje',
      message: '¿Desea cancelar el viaje actual?',
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          cssClass: 'cancel-button',
          handler: () => {
            console.log('Viaje cancelado');
          }
        },
        {
          text: 'Volver',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => {
            console.log('Operación cancelada');
          }
        }
      ]
    });

    await alert.present();
  }


  buscarviaje() {
    this.navCtrl.navigateForward('/buscar-viaje');
  }

  misviajes() {
    this.navCtrl.navigateForward('/p-mis-viajes');
  }
}
