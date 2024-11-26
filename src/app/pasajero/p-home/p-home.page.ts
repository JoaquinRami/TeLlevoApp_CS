import { BuscarViajePage } from './../buscar-viaje/buscar-viaje.page';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular'; 
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import firebase from 'firebase/compat/app'; 



@Component({
  selector: 'app-p-home',
  templateUrl: './p-home.page.html',
  styleUrls: ['./p-home.page.scss'],
})
export class PHomePage implements OnInit {

  usuario:string=""
  constructor(private navCtrl: NavController,private alertController: AlertController,private firestore: AngularFirestore) { }

  ngOnInit(){
    var x=localStorage.getItem("usuario")
    this.usuario=x ?? ''
  }

  ionViewWillEnter() {
    this.buscarviajeact();
  }



  buscarviajeact() {
    const nombreUsuario = localStorage.getItem('usuario');

      this.firestore.collection('viaje', ref => ref.where('pasajero', 'array-contains', this.usuario).where('estadoviaje', 'in', ["No iniciado", "En progreso"])).get().subscribe((querySnapshot) => {
        
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const docRef = doc.ref; 
            const data: any = doc.data();

            localStorage.setItem('conductor', data.conductor);
          });
        } 
      
      });
  }



  cancelar() {
    const nombreUsuario = localStorage.getItem('usuario');
    const nombrecon = localStorage.getItem('conductor');

    this.firestore.collection('viaje', ref => ref.where('conductor', '==', nombrecon).where('estadoviaje', '==', "No iniciado")).get().subscribe((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref; 
          const data: any = doc.data();


        docRef.update({ pasajero: firebase.firestore.FieldValue.arrayRemove(nombreUsuario),pasajeros :firebase.firestore.FieldValue.increment(-1),
          pconfirmados: firebase.firestore.FieldValue.arrayRemove(nombreUsuario),}).then( () => {
              this.showAlert('Listo', 'Viaje Cancelado');
              localStorage.setItem('conductor', '0');
        });
        });
      } else {
        this.showAlert('Error', 'Sin viaje para borrar/viaje ya inicio.');
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


  viajeact(){
    this.navCtrl.navigateForward('/p-viaje');
  }


  
  buscarviaje() {
    if(localStorage.getItem('conductor')!="0"){
      this.showAlert('Error', 'Ya tiene un viaje Activo.');
    }else{
      this.navCtrl.navigateForward('/buscar-viaje');
    }
    
  }

  misviajes() {
    this.navCtrl.navigateForward('/p-mis-viajes');
  }
}
