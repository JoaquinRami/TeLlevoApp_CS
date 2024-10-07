import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PQrPage } from './p-qr.page';

const routes: Routes = [
  {
    path: '',
    component: PQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PQrPageRoutingModule {}
