import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigPage } from './config.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigPage
  },
  {
    path: 'pin',
    loadChildren: () => import('./pin/pin.module').then( m => m.PinPageModule)
  },
  {
    path: 'theme',
    loadChildren: () => import('./theme/theme.module').then( m => m.ThemePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigPageRoutingModule {}
