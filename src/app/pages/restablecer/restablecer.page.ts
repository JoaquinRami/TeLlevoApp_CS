import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private firestore: AngularFirestore,private router: Router, private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit() {}

  async changePassword() {
    const nombreUsuario = localStorage.getItem('usuario');
  
    if (this.newPassword !== this.confirmPassword) {
      await this.showAlert('Error', 'Las nuevas contraseñas no coinciden.');
      return;
    }
  
    this.firestore.collection('usuarios', ref => ref.where('nombre', '==', nombreUsuario)).get().subscribe((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref; 
          const data: any = doc.data();

          docRef.update({ password: this.newPassword }).then(async () => {
            await this.showAlert('Listo', 'La contraseña ha sido cambiada.');
            this.router.navigate(['/login']); 
          }).catch(async (error) => {
            console.error('Error al actualizar la contraseña:', error);
            await this.showAlert('Error', 'Hubo un problema. Inténtalo de nuevo.');
          });
        });
      } else {
        this.showAlert('Error', 'Usuario no encontrado.');
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
}  