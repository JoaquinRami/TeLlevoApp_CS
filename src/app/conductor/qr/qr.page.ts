import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    barcodes.forEach((barcode) => {
      const scannedData = JSON.parse(barcode.rawValue);
      localStorage.setItem('scaner', barcode.rawValue);

      this.firestore.collection('viaje', (ref) =>ref.where('conductor', '==', scannedData.conductor).where('fechah', '==', scannedData.fechah)).get().subscribe((querySnapshot) => {
          if (!querySnapshot.empty) {
            let encontro = false;
            querySnapshot.forEach((doc) => {
              const docRef = doc.ref;
              const data: any = doc.data();

              const pasajerobuscar = data.pasajero.includes(
                scannedData.pasajero
              );

              if (pasajerobuscar) {
                encontro = true;


                docRef.update({pconfirmados: firebase.firestore.FieldValue.arrayUnion(scannedData.pasajero),}).then(() => {
                    this.showAlert(
                      'Listo',
                      'El pasajero ha sido confirmado'
                    );
                  });
              }
            });

            if (!encontro) {
              this.showAlert(
                'Error',
                'El pasajero no es parte de este viaje'
              );
            }
          } else {
            this.showAlert(
              'Error',
              'No se encontró el viaje del qr'
            );
          }
        });
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });

    await alert.present();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permison Denegado',
      message: 'Acepte los permiso de la camara.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBack() {
    this.navCtrl.navigateForward('/viaje');
  }
}
