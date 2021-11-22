import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tigo',
    loadChildren: () => import('./tigo/tigo.module').then( m => m.TigoPageModule)
  },
  {
    path: 'paquetes',
    loadChildren: () => import('./paquetes/paquetes.module').then( m => m.PaquetesPageModule)
  },
  {
    path: 'cambiapin',
    loadChildren: () => import('./cambiapin/cambiapin.module').then( m => m.CambiapinPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
