import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planificar-viaje',
  templateUrl: './planificar-viaje.page.html',
  styleUrls: ['./planificar-viaje.page.scss'],
})
export class PlanificarViajePage implements OnInit {
  origen: string = '';
  destino: string = '';
  capacidad: number | null = null;
  tarifa: number | null = null;
  hora: string = '';

  direccion_buscar = 'https://api.mapbox.com/geocoding/v5/mapbox.places/XXXX.json?access_token=pk.eyJ1IjoibWplYWdlciIsImEiOiJjbTI0cmE4MXQwa2VrMnFwdXhudTBrZWJzIn0.aeLl8YamXtwLIr4e1rUbjw'
  arreglo_direcciones: Direccion[] = []

  constructor(private navCtrl: NavController, private alertController: AlertController, private firestore: AngularFirestore, private http: HttpClient) {}

  ngOnInit() {

  }

  cuandoCambie(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    this.buscarDireccion();
  }

  buscarDireccion() {
    var dire_nueva = this.direccion_buscar.replaceAll('XXXX', this.destino)
    this.http.get(dire_nueva).subscribe((data: any) => {
      this.arreglo_direcciones = []
      for (let index = 0; index < data.features.length; index++) {
        const element = data.features[index];
        let dire: Direccion = {
          place_name: element["place_name"],
          lng: element["center"][0],
          lat: element["center"][1]
        }
        this.arreglo_direcciones.push(dire)
      }
    })
  }

  seleccionarDireccion(ev) {
    console.log(ev.detail.value)

  }

  patente: any[] = [];

  formatof(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  formatoh(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }




  validar() {
    const nombreUsuario = localStorage.getItem('usuario');
    const fechaF = this.formatof(new Date());
    const fechah = this.formatoh(new Date());
    if (!this.origen || !this.destino || this.capacidad === null || this.tarifa === null || !this.hora) {
      this.showAlert('Error', 'Todos los campos son obligatorios');
      return;
    }

    this.firestore.collection('viaje', ref => ref.where('conductor', '==', nombreUsuario)).get().subscribe((querySnapshot) => {
      if (!querySnapshot.empty) {
        let viajeEnEspera = false;

        querySnapshot.forEach((doc) => {
          const data: any = doc.data();

          if (data.estado === "En espera") {
            viajeEnEspera = true;
          }
        });

        if (viajeEnEspera) {
          this.showAlert('Error', 'Ya tienes un viaje en espera(Cancelalo para crear otro).');
          return;
        }
      }

      this.firestore.collection('viaje').add({
        conductor: nombreUsuario,
        origen: this.origen,
        destino: this.arreglo_direcciones[0].place_name,
        lng: this.arreglo_direcciones[0].lng,
        lat: this.arreglo_direcciones[0].lat,
        capacidad: this.capacidad,
        pasajeros: 0,
        tarifa: this.tarifa,
        hora: this.hora,
        estado: "En espera",
        estadoviaje: "No iniciado",
        fecha: fechaF,
        fechah: fechah,
        horatermino: 0,
        pasajero: [],
        pconfirmados:[]
      }).then(() => {
        this.showAlert('Listo', 'Viaje Creado');
      }).catch((error) => {
        this.showAlert('Error', 'No se pudo guardar el formulario. Intenta nuevamente.');
      });
    });
  }



  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }


  goBack() {
    this.navCtrl.navigateForward('/c-home');
  }

  async horaAlert() {
    const alert = await this.alertController.create({
      header: 'Seleccione hora',
      inputs: [
        {
          name: 'time',
          type: 'time',
          value: this.hora || '',
          label: 'Hora',
          attributes: {
            step: '60'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            this.hora = data.time;
          }
        }
      ]
    });

    await alert.present();
  }
}


export interface Direccion {
  place_name: string;
  lng: number;
  lat: number;
}

