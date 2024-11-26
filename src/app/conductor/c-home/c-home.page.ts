import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; 
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 

@Component({
  selector: 'app-c-home',
  templateUrl: './c-home.page.html',
  styleUrls: ['./c-home.page.scss'],
})
export class CHomePage implements OnInit {

  usuario:string=""
  
  constructor(private navCtrl: NavController,private alertController: AlertController,private firestore: AngularFirestore) { } 
  
  ngOnInit(): void {
    var x=localStorage.getItem("usuario")
    this.usuario=x ?? ''
  }

  ionViewWillEnter() {
    this.api();
  }

  api() {
    const url = 'https://www.meteosource.com/api/v1/free/point?place_id=puente-alto&sections=all&timezone=UTC&language=en&units=metric&key=v5axpgcayhchjop1m95xwsjqdqdzsr69psxst464';
  
    fetch(url)
      .then(response => {
        
  
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos del clima:', data);
      })
      .catch(error => {
        console.error('Error al obtener los datos del clima:', error);
      });
  }



  cancelar() {
    const nombreUsuario = localStorage.getItem('usuario');

    this.firestore.collection('viaje', ref => ref.where('conductor', '==', nombreUsuario).where('estado', '==', "En espera")).get().subscribe((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref; 
          const data: any = doc.data();

          docRef.update({ estado: "cancelado" , estadoviaje:"cancelado"}).then( () => {
              this.showAlert('Listo', 'Viaje Cancelado');
          }).catch(async (error) => {
              this.showAlert('Error', 'Hubo un problema.');
          });
        });
      } else {
        this.showAlert('Error', 'Sin viajes para cancelar.');
      }
    
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
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
