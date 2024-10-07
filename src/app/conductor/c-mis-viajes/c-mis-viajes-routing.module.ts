import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CMisViajesPage } from './c-mis-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: CMisViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CMisViajesPageRoutingModule {}
