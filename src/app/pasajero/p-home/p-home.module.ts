import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PHomePageRoutingModule } from './p-home-routing.module';

import { PHomePage } from './p-home.page';
import { ComponenteModule } from 'src/app/componentes/componente.module';

@NgModule({
  imports: [
    CommonModule,
    ComponenteModule,
    FormsModule,
    IonicModule,
    PHomePageRoutingModule
  ],
  declarations: [PHomePage]
})
export class PHomePageModule {}
