import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-p-qr',
  templateUrl: './p-qr.page.html',
  styleUrls: ['./p-qr.page.scss'],
})
export class PQrPage implements OnInit {
  valorQR: string = 'Cargando...';
  valorQRJSON = {
    conductor: '',
    pasajero: '',
    fechah: '',
  };

  constructor(private navCtrl: NavController, private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.crearQR();
  }

  crearQR() {
    const nombreConductor = localStorage.getItem("conductor");
    const nombre = localStorage.getItem("usuario")|| '';;
  
    this.firestore.collection('viaje', ref => ref.where('conductor', '==', nombreConductor).where('estadoviaje', '==', "No iniciado").limit(1)).get()
      .subscribe(querySnapshot => {
        const doc = querySnapshot.docs[0];
        const data = doc.data() as { conductor: string, fechah: string };
        const { conductor, fechah } = data;
  
        this.valorQRJSON = {
          conductor: conductor,
          pasajero: nombre, 
          fechah: fechah
        };
  
        this.valorQR = JSON.stringify(this.valorQRJSON);
      });
  }
  

  goBack() {
    this.navCtrl.navigateForward('/p-viaje');
  }

}
