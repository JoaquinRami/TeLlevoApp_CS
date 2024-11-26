import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase/compat/app';




@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

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

    const nombreUsuario = localStorage.getItem('usuario');


    this.firestore.collection('viaje', ref => ref.where('conductor', '==', nombreUsuario).where('estado', '==', "En espera")).get().subscribe((querySnapshot) => {
      this.viajes = [];

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref;
          const data = doc.data() as {
            conductor: string;
            pasajero: string;
            fechah: string;
            destino: string;
            lng: number;
            lat: number;
            origen: string;
            capacidad: number;
            tarifa: number;
            hora: string;
            pasajeros: number;
            estadoviaje: string;
            fecha: string;
            pconfirmados: string[];
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
            pconfirmados: data.pconfirmados
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
          if (data.estadoviaje === "En progreso") {
            this.mostrarBoton = true;
            this.ocultarBoton = false;
          }

          if (data.estadoviaje === "No iniciado") {
            this.mostrarBoton = false;
            this.ocultarBoton = true;
          }
        });
      }
    });
  }

  iniciarviaje() {
    const nombreUsuario = localStorage.getItem('usuario');
    this.firestore.collection('viaje', ref => ref.where('conductor', '==', nombreUsuario).where('estadoviaje', '==', "No iniciado")).get().subscribe((querySnapshot) => {
      this.viajes = [];

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref;
          const data = doc.data() as {
            destino: string;
            origen: string;
            capacidad: number;
            tarifa: number;
            hora: string;
            pasajeros: number;
            estadoviaje: string;
            fecha: string;
            pasajero: string[];
          };
          this.viajes.push({
            destino: data.destino,
            origen: data.origen,
            capacidad: data.capacidad,
            tarifa: data.tarifa,
            hora: data.hora,
            pasajeros: data.pasajeros,
            estadoviaje: data.estadoviaje,
            fecha: data.fecha
          });



          docRef.update({ estadoviaje: "En progreso" }).then(() => {
            this.obtenerViajes();
            this.ocultarBoton = false;
            this.mostrarBoton = true;
            this.showAlert('Listo', 'Viaje iniciado');
          }).catch(async (error) => {
            this.showAlert('Error', 'Hubo un problema.');
          });
        });
      } else {
        this.showAlert('Error', 'Sin viajes para iniciar.');
      }

    });
  }


  finalizarviaje() {
    const nombreUsuario = localStorage.getItem('usuario');
    const hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
    this.firestore.collection('viaje', ref => ref.where('conductor', '==', nombreUsuario).where('estadoviaje', '==', "En progreso")).get().subscribe((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref;
          const data: any = doc.data();

          docRef.update({ estado: "Finalizado", estadoviaje: "Terminado", horatermino: hora }).then(() => {
            this.goBack();
            this.obtenerViajes();
            this.showAlert('Listo', 'Viaje finalizado');
          }).catch(async (error) => {
            this.showAlert('Error', 'Hubo un problema.');
          });
        });
      } else {
        this.showAlert('Error', 'Sin viajes para terminar.');
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


  QR() {
    this.navCtrl.navigateForward('/qr');
  }
  goBack() {
    this.navCtrl.navigateForward('/c-home');
  }
}
