import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CMisViajesPageRoutingModule } from './c-mis-viajes-routing.module';

import { CMisViajesPage } from './c-mis-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CMisViajesPageRoutingModule
  ],
  declarations: [CMisViajesPage]
})
export class CMisViajesPageModule {}
