import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TigoPageRoutingModule } from './tigo-routing.module';

import { TigoPage } from './tigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TigoPageRoutingModule
  ],
  declarations: [TigoPage]
})
export class TigoPageModule {}
