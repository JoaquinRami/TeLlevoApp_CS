import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre: string = '';
  password: string = '';
  

  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private alertController: AlertController,  
    private router: Router
  ) {}

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    this.nombre=''
    this.password=''
  }

  validar() {
    this.firestore.collection('usuarios', ref => ref.where('nombre', '==', this.nombre)).get().subscribe((querySnapshot) => {
      
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const data: any = doc.data();
            localStorage.setItem('usuario', '');
            localStorage.setItem('conductor', '0');
            if (data.password === this.password) {
              if (data.rol === 'conductor') {
                localStorage.setItem('usuario', this.nombre);
                this.navCtrl.navigateForward(['/c-home']);
              } else if (data.rol === 'pasajero') {
                localStorage.setItem('usuario', this.nombre); 
                this.navCtrl.navigateForward(['/p-home']);
              }
            } else {
              this.presentAlert(); 
            }
          });
        } else {
          this.presentAlert(); 
        }
      });
  }

  
  

  async presentAlert() {
    const alert = await this.alertController.create({  
      header: 'Inicio Sesión',
      subHeader: 'Acceso Denegado',
      message: 'Nombre o Contraseña Incorrecto',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
