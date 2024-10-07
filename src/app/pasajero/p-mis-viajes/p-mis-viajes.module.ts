import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PMisViajesPageRoutingModule } from './p-mis-viajes-routing.module';

import { PMisViajesPage } from './p-mis-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PMisViajesPageRoutingModule
  ],
  declarations: [PMisViajesPage]
})
export class PMisViajesPageModule {}
