import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; 
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-c-home',
  templateUrl: './c-home.page.html',
  styleUrls: ['./c-home.page.scss'],
})
export class CHomePage implements OnInit {

  usuario:string=""
  
  constructor(private navCtrl: NavController,private alertController: AlertController) { } 
  
  ngOnInit(): void {
    var x=localStorage.getItem("usuario")
    this.usuario=x ?? ''
  }

  async cancelar() {
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

  planificarViaje() {
    this.navCtrl.navigateForward('/planificar-viaje');
  }

  iniciarviaje() {  
    this.navCtrl.navigateForward('/viaje');
  }

  misviajes() {
    this.navCtrl.navigateForward('/c-mis-viajes');
  }

}
