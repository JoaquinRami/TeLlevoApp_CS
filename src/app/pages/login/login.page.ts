import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private AlertController: AlertController
  ) {}

  ngOnInit() {}

  validar() {
    if (this.nombre === 'conductor' && this.password === '123') {
      console.log('Bienvenido, conductor');
      localStorage.setItem('usuario', this.nombre);

      this.navCtrl.navigateForward(['/c-home']);
    } else if (this.nombre === 'pasajero' && this.password === '123') {
      console.log('Bienvenido, Pasajero');
      localStorage.setItem('usuario', this.nombre);

      this.navCtrl.navigateForward(['/p-home']);
    } else {
      console.log('Usuario/Contraseña Incorrecto');
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.AlertController.create({
      header: 'Inicio Sesión',
      subHeader: 'Acceso Denegado',
      message: 'Nombre o Contraseña Incorrecto',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}