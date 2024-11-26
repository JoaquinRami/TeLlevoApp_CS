import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PViajePageRoutingModule } from './p-viaje-routing.module';

import { PViajePage } from './p-viaje.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    PViajePageRoutingModule
  ],
  declarations: [PViajePage]
})
export class PViajePageModule {}
