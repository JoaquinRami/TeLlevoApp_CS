import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-p-viaje',
  templateUrl: './p-viaje.page.html',
  styleUrls: ['./p-viaje.page.scss'],
})
export class PViajePage implements OnInit {

  map: mapboxgl.Map;
  longInicio: number = -70.57882462578776
  latInicio: number = -33.598317608093666

  constructor(private navCtrl: NavController, private firestore: AngularFirestore, private alertController: AlertController, private http: HttpClient) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerViajes();
  }


  mostrarBoton: boolean = false;
  ocultarBoton: boolean = true;
  viajes: any[] = [];

  obtenerViajes() {
    const nombrecon = localStorage.getItem('conductor');
    const nombreUsuario = localStorage.getItem('usuario');
    this.mostrarBoton = false;
    this.ocultarBoton = true;

    this.firestore.collection('viaje', ref => ref.where('conductor', '==', nombrecon).where('estado', '==', "En espera")).get().subscribe((querySnapshot) => {
      this.viajes = [];

      if (querySnapshot.empty) {
        this.showAlert('Error', 'Sin viaje activo/o Termino el activo.');
        localStorage.setItem('conductor', '0');
        this.goBack();
      }

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as {
            conductor: string;
            destino: string;
            lng: number;
            lat: number;
            origen: string;
            capacidad: number;
            tarifa: number;
            hora: string;
            pasajeros: number;
            estadoviaje: string;
            pasajero: string[];
            fecha: string;
            estado: string;
            fechah: string;
          };
          this.viajes.push({
            destino: data.destino,
            origen: data.origen,
            capacidad: data.capacidad,
            tarifa: data.tarifa,
            hora: data.hora,
            pasajeros: data.pasajeros,
            estadoviaje: data.estadoviaje,
            fecha: data.fecha,
            estado: data.estado
          });
          //Creacion del mapa
          this.map = new mapboxgl.Map({
            accessToken: environment.TOKEN_MAPBOX,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 16,
            center: [this.longInicio, this.latInicio],
            container: 'mapa-box'
          })
          //marcador del mapa
          new mapboxgl.Marker({ color: 'red' })
            .setLngLat([this.longInicio, this.latInicio]).addTo(this.map)
          new mapboxgl.Marker({ color: 'green' })
            .setLngLat([data.lng, data.lat]).addTo(this.map)
          var ruta = `https://api.mapbox.com/directions/v5/mapbox/driving/-70.57882462578776,-33.598317608093666;${data.lng},${data.lat}?geometries=geojson&access_token=pk.eyJ1IjoibWplYWdlciIsImEiOiJjbTI0cmE4MXQwa2VrMnFwdXhudTBrZWJzIn0.aeLl8YamXtwLIr4e1rUbjw`


          this.map.on('load', () => {
            if (this.map.getSource('route')) {
              this.map.removeSource('route');
            }
            this.http.get(ruta).subscribe((data: any) => {
              console.log(data.routes[0].geometry)
              this.map.addSource('route', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  geometry: data.routes[0].geometry,
                  properties: {}
                },
              });
              this.map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                  "line-cap": 'round',
                  "line-join": 'round'
                },
                paint: {
                  "line-color": 'blue',
                  "line-width": 6
                }
              })
            })
          })



          for (let i = 0; i < data.pasajero.length; i++) {
            if (data.pasajero[i] === nombreUsuario) {
              this.mostrarBoton = true;
              this.ocultarBoton = false;
              break;
            }
          }
        });
      }
    });
  }



  unirse() {
    const nombreUsuario = localStorage.getItem('usuario');
    const nombrecon = localStorage.getItem('conductor');

    this.firestore.collection('viaje', ref => ref.where('conductor', '==', nombrecon).where('estadoviaje', '==', "No iniciado")).get().subscribe((querySnapshot) => {
      if (querySnapshot.empty) {
        localStorage.setItem('conductor', '0');
        this.goBack();
      }
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref;
          const data: any = doc.data();


          let buscarusuario = false;
          for (let i = 0; i < data.pasajero.length; i++) {
            if (data.pasajero[i] === nombreUsuario) {
              buscarusuario = true;
              break;
            }
          }


          if (data.capacidad <= data.pasajeros) {
            this.showAlert('Error', 'Viaje sin cupos.');
            localStorage.setItem('conductor', '0');
            this.goBack();
          } else if (buscarusuario) {
            this.showAlert('Error', 'Ya te has unido');
          } else {
            docRef.update({
              pasajero: firebase.firestore.FieldValue.arrayUnion(nombreUsuario),
              pasajeros: firebase.firestore.FieldValue.increment(+1)
            }).then(() => {
              this.showAlert('Listo', 'Te has unido al Viaje');
            });
            this.obtenerViajes();
            this.mostrarBoton = true;
            this.ocultarBoton = false;
          }
        });
      } else {
        this.showAlert('Error', 'Desconocido.');
        localStorage.setItem('conductor', '0');
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

  goBack() {
    this.navCtrl.navigateForward('/p-home');
  }

  QR() {
    this.navCtrl.navigateForward('/p-qr');
  }

}
