import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanificarViajePage } from './planificar-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: PlanificarViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanificarViajePageRoutingModule {}
