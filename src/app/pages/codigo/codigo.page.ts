import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.page.html',
  styleUrls: ['./codigo.page.scss'],
})
export class CodigoPage implements OnInit {
  nombre: string = '';
  codigo: string = '';
  codigoGenerado: string = '';
  tiempoRestante: number = 300; 
  contadorMinutos: number = 5;
  contadorSegundos: number = 0;
  intervalo: any;

  constructor(private firestore: AngularFirestore, private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit() {
  }

  iniciarContador() {
    this.intervalo = setInterval(() => {
      this.contadorMinutos = Math.floor(this.tiempoRestante / 60);
      this.contadorSegundos = this.tiempoRestante % 60;

      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalo);
        this.presentAlert('Error', 'El tiempo ha expirado, solicite un nuevo código.');
      }

      this.tiempoRestante--;
    }, 1000);
  }


  enviarCodigo() {
    this.firestore.collection('usuarios', ref => ref.where('nombre', '==', this.nombre)).get().subscribe((querySnapshot) => {
      
      if (!querySnapshot.empty) {
        localStorage.setItem('usuario', this.nombre);
        this.codigoGenerado = Math.floor(100000 + Math.random() * 900000).toString();
        this.codigo = this.codigoGenerado;
  
        this.iniciarContador();
      } else {
        this.presentAlert('Error', 'El nombre ingresado no es válido.');
      }
  
    });
  }

  validarFormulario() {
    if (this.codigo !== this.codigoGenerado) {
      this.presentAlert('Error', 'El código de verificación es incorrecto.');
      return;
    }

    this.navCtrl.navigateForward('/restablecer');
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

}
