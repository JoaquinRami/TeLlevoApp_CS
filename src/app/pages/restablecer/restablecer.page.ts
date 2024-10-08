import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit() {}

  async changePassword() {
    
    if (this.newPassword !== this.confirmPassword) {
      await this.showAlert('Error', 'Las nuevas contraseñas no coinciden.');
      return;
    }

 
    localStorage.setItem('password', this.newPassword);

   
    await this.showAlert('Éxito', 'La contraseña ha sido cambiada exitosamente.');

  
    this.router.navigate(['/login']);
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
}
