import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TigoPage } from './tigo.page';

const routes: Routes = [
  {
    path: '',
    component: TigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TigoPageRoutingModule {}
