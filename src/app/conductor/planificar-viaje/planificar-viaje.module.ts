import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanificarViajePageRoutingModule } from './planificar-viaje-routing.module';

import { PlanificarViajePage } from './planificar-viaje.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    PlanificarViajePageRoutingModule
  ],
  declarations: [PlanificarViajePage]
})
export class PlanificarViajePageModule {}
