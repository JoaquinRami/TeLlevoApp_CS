import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})


export class BuscarViajePage implements OnInit {

  constructor(private navCtrl: NavController, private firestore: AngularFirestore,private alertController: AlertController) { }

  ngOnInit() {
    this.obtenerViajes();
  }

  viajes: any[] = []; 

  obtenerViajes() { 
    this.firestore.collection('viaje', ref => ref.where('estadoviaje', '==', "No iniciado")).get().subscribe((querySnapshot) => {
        this.viajes = []; 
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const data = doc.data() as { 
                conductor: string;
                destino: string;
                origen: string;
                capacidad: number;
                tarifa: number;
                hora: string;
                pasajeros: number;
                estado: string
                estadoviaje: string;
                fecha: string;
            };
                this.viajes.push({
                  conductor: data.conductor,
                  destino: data.destino,
                  origen: data.origen,
                  capacidad: data.capacidad,
                  tarifa: data.tarifa,
                  hora: data.hora,
                  pasajeros: data.pasajeros,
                  estadoviaje: data.estadoviaje,
                  estado: data.estado,
                  fecha: data.fecha
                });   
            });
        } 
    });
  }



  irviaje(conductor: string) {
    localStorage.setItem('conductor', conductor);
    this.showAlert('Listo', 'Viaje seleccionado como activo.');
    this.navCtrl.navigateForward('/p-home');
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

  goBack() {
    this.navCtrl.navigateForward('/p-home');
  }

  
}
