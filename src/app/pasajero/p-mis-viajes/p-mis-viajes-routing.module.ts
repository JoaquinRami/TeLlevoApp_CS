import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PMisViajesPage } from './p-mis-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: PMisViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PMisViajesPageRoutingModule {}
