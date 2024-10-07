import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CHomePage } from './c-home.page';

const routes: Routes = [
  {
    path: '',
    component: CHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CHomePageRoutingModule {}
