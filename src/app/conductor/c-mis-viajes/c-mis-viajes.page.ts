import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-c-mis-viajes',
  templateUrl: './c-mis-viajes.page.html',
  styleUrls: ['./c-mis-viajes.page.scss'],
})
export class CMisViajesPage implements OnInit {

  constructor(private navCtrl: NavController, private firestore: AngularFirestore,private alertController: AlertController) { }

  ngOnInit() {
    this.obtenerViajes();
  }

  viajes: any[] = []; 


  imagen(viajes: any): string {
    if (viajes.estado === 'Finalizado') {
      return '../../../assets/icon/check.png';
    } else if (viajes.estado === 'cancelado') {
      return '../../../assets/icon/cancelado.png';
    } else {
      return '../../../assets/icon/en_progreso.png'; 
    }
  }
  

  obtenerViajes() {
    const nombreUsuario = localStorage.getItem('usuario');

    
    this.firestore.collection('viaje', ref => ref.where('conductor', '==', nombreUsuario)).get().subscribe((querySnapshot) => {
        this.viajes = []; 
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const data = doc.data() as { 
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


  goBack() {
    this.navCtrl.navigateForward('/c-home');
  }
}
