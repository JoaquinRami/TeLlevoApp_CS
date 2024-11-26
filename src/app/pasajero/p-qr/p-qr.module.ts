import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PQrPageRoutingModule } from './p-qr-routing.module';

import { PQrPage } from './p-qr.page';

import { QrCodeModule } from 'ng-qrcode'; /*crear qr*/

@NgModule({
  imports: [
    QrCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PQrPageRoutingModule
  ],
  declarations: [PQrPage]
})
export class PQrPageModule {}
