import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PHomePage } from './p-home.page';

const routes: Routes = [
  {
    path: '',
    component: PHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PHomePageRoutingModule {}
