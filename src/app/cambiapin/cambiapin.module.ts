import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiapinPageRoutingModule } from './cambiapin-routing.module';

import { CambiapinPage } from './cambiapin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiapinPageRoutingModule
  ],
  declarations: [CambiapinPage]
})
export class CambiapinPageModule {}
