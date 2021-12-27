import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { AlertController } from '@ionic/angular';
import { ServiciosService } from '../servicios.service';
@Component({
  selector: 'app-tigo',
  templateUrl: './tigo.page.html',
  styleUrls: ['./tigo.page.scss'],
})
export class TigoPage implements OnInit {
  private color: string;
  private telefono: string;
  private monto: string;
  private pin: string;
  private header: string;
  private result= '';

  constructor(
    private call: CallNumber,
    public alertController: AlertController,
    private servicio: ServiciosService,
  ) {
    this.servicio.setColor();
    this.header = this.servicio.theme.head;
    this.color = this.servicio.theme.col;
    if(localStorage.getItem('dataUser')) {
      this.pin = JSON.parse(localStorage.getItem('dataUser')).pin;
    }
   }

  ngOnInit() {}

  limpiar(){
    this.telefono = '';
    this.monto = '';
    this.result = '';
  }

   async recargar(): Promise<any>
   {
     if(this.telefono && this.monto){
      try{
        this.result = '*108*' + this.monto + '*' + this.telefono + '*' + this.pin +'#';
        await this.call.callNumber(String(this.result), true);
      }
      catch(e){ console.error(e); }
    }else{
      const campoRequerido = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Campos Requerido',
        message: 'Porfa llene los campos requeridos',
        buttons: ['OK']
      });
      await campoRequerido.present();
    }

    this.limpiar();
  }

}
