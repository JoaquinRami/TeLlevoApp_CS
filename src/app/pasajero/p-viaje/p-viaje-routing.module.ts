import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PViajePage } from './p-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: PViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PViajePageRoutingModule {}
