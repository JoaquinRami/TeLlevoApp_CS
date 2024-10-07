import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarViajePageRoutingModule } from './buscar-viaje-routing.module';

import { BuscarViajePage } from './buscar-viaje.page';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    BuscarViajePageRoutingModule
  ],
  declarations: [BuscarViajePage]
})
export class BuscarViajePageModule {}