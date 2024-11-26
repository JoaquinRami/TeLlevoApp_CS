import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-p-mis-viajes',
  templateUrl: './p-mis-viajes.page.html',
  styleUrls: ['./p-mis-viajes.page.scss'],
})
export class PMisViajesPage implements OnInit {

  constructor(private navCtrl: NavController, private firestore: AngularFirestore,private alertController: AlertController) { }

  ngOnInit() {
    this.obtenerViajes();
  }
  
  imagen(viajes: any): string {
    if (viajes.estado === 'Finalizado') {
      return '../../../assets/icon/check.png';
    } else if (viajes.estado === 'cancelado') {
      return '../../../assets/icon/cancelado.png';
    } else {
      return '../../../assets/icon/en_progreso.png'; 
    }
  }

  viajes: any[] = []; 

  obtenerViajes() {
    const nombreUsuario = localStorage.getItem('usuario');
    
    this.firestore.collection('viaje', ref => ref.where('pconfirmados', 'array-contains', nombreUsuario)).get().subscribe((querySnapshot) => {
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
                fechah: string;
                horatermino: string;
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
                  fecha: data.fecha,
                  fechah: data.fechah,
                  horat: data.horatermino
                });   
            });
        } 
    });
  }



  goBack() {
    this.navCtrl.navigateForward('/p-home');
  }

}
