import { AlertController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.page.html',
  styleUrls: ['./paquetes.page.scss'],
})
export class PaquetesPage implements OnInit {
  private color: string;
  private header: string;
  private pin: string;
  private numero: string;
  private paqTipo: string;
  private paqDesc: string;
  private paqDescTipo;
  private estado = false;
  private reset = false;
  private selectedPaq;
  private selectedDes;
  private paqActual;
  private result: string;
  private paquetes = [
    { tipo: 'Minutos', value : 'min', },
    { tipo: 'Mensajes', value : 'men', },
    { tipo: 'Internet', value : 'int', },
    { tipo: 'Gamer Tigo', value : 'gam', },
    { tipo: 'Plus Tigo', value : 'plu', },
  ];
  private paqDescription = {
    min: ['20 MINUTOS 1D C$20',
          'C$30 HABLA + 2 LLAMADA ILIMI + WA 2D',
          'C$50 HABLA + 4 LLAMADA ILIMI + WA 4D',
          '20 MINUTOS COSTA RICA 1D C$20',
          '20 MINUTOS USA Y CANADA 1D C$20'],
    men: ['C$20 CHAT2 MENSAJES ILIM 2D'],
    int: ['C$20-450MB + 20 MIN TIGO CA Y USA + WA 1D',
          'C$30-700MB + 30 MIN TIGO CA Y USA + WA 2D',
          'C$50-2.2GB + 80 MIN TIGO CA Y USA + REDES 4D',
          'C$70-3GB + LLAM ILIM TIGO + REDES 5D',
          'C$100-4GB + LLAM ILIM TIGO + REDES 7D',
          'C$200-6.2GB + LLAM ILIM TIGO + REDES 15D'],
    gam: ['C$40-2GB JUEGOS + 700MB + 30MIN-CA-USA + WA 2D',
          'C$80-5GB JUEGOS + 3GB + MINILIM+REDES 5D',
          'C$120-7GB JUEGOS + 4GB + MINILIM+REDES 7D'],
    plu: ['C$100-4GB + 30 MIN MULTIUSO + LLAMAD ILIM + REDES 7D',
          'C$300-9GB + 50 MIN MULTIUSO + LLAMAD ILIM + REDES 15D']
  };

  constructor(
    public alertController: AlertController ,
    private call: CallNumber,
    private servicio: ServiciosService
  ) {
      this.pin = JSON.parse(localStorage.getItem('dataUser')).pin;
      this.servicio.setColor();
      this.header = this.servicio.theme.head;
      this.color = this.servicio.theme.col;
  }

  ngOnInit() {}

  paqueteSeleccionado(){
    if(this.selectedPaq.value){
      this.estado = true;
      this.paqTipo = this.selectedPaq.tipo;
      this.paqActual = this.paqDescription[this.selectedPaq.value];
    }
  }

  descSeleccionado(){
    if(this.selectedDes){
      this.paqDescTipo = Number(this.selectedDes);
      this.paqDesc = this.paqDescription[this.selectedPaq.value][Number(this.selectedDes)];
    }
  }

  resetValues(){
    this.numero = '';
    this.paqTipo = '';
    this.paqDesc = '';
    this.selectedPaq = {};
    this.selectedDes = '';
    this.estado = false;
  }

  getQuery(){
    return {
      min: ['*110*1*','*110*2*','*110*3*','*110*5*','*110*6*'],//MINUTOS
      men: ['*110*4*'],//MENSAJES
      int: ['*110*7*','*110*8*','*110*9*','*110*10*','*110*11*','*110*12*'],//INTERNET
      gam: ['*110*13*','*110*14*','*110*15*'],//GAMER
      plu: ['*110*16*','*110*17*'],//PLUS
    }[this.selectedPaq.value][this.paqDescTipo] + this.numero + '*' + this.pin + '#';
  }

  async realizarRecarga(): Promise<any>
  {
    try {
      if(this.numero && this.numero.length === 8 && this.paqTipo && this.paqDesc){
        this.reset = true;
        this.result = this.getQuery();
        await this.call.callNumber(String(this.result), true);

      }else if(!this.numero || !this.paqTipo || !this.paqDesc){
        const inputNumber = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Advertencia',
          message: 'Todos los campos son requeridos',
          buttons: ['OK']
        });
        await inputNumber.present();

      }else if(this.numero.length < 8){
        const inputNumberCant = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Advertencia',
          message: 'El número debe tener 8 dígitos',
          buttons: ['OK']
        });
        await inputNumberCant.present();
      }
    } catch (e) { console.error(e); }
    finally {
      if(this.reset){
        this.resetValues();
        this.reset = false;
      }
    }
  }

}
