import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PViajePageRoutingModule } from './p-viaje-routing.module';

import { PViajePage } from './p-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PViajePageRoutingModule
  ],
  declarations: [PViajePage]
})
export class PViajePageModule {}
