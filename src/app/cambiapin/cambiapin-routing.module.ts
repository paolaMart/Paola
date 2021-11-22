import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiapinPage } from './cambiapin.page';

const routes: Routes = [
  {
    path: '',
    component: CambiapinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiapinPageRoutingModule {}
