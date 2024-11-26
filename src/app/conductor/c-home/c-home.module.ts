import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CHomePageRoutingModule } from './c-home-routing.module';

import { CHomePage } from './c-home.page';
import { ComponenteModule } from 'src/app/componentes/componente.module';

@NgModule({
  imports: [
    CommonModule,
    ComponenteModule,
    FormsModule,
    IonicModule,
    CHomePageRoutingModule
  ],
  declarations: [CHomePage]
})
export class CHomePageModule {}
