import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.scss'],
})
export class CerrarSesionComponent  implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {}

  cerrarSesion() {
    localStorage.clear();
    this.navController.navigateRoot('/login');
  }

}
