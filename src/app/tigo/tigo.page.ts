import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ServiciosService } from '../servicios.service';

import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tigo',
  templateUrl: './tigo.page.html',
  styleUrls: ['./tigo.page.scss'],
})
export class TigoPage implements OnInit {

  //recarga electronica
  
    numero_m: String;
    monto_m: String;
    result: String ="";
    
  constructor(private call: CallNumber, private servicio: ServiciosService, public alertController: AlertController) { }
  
    ngOnInit() { 
      
    }
  
  
  limpiar(){
    this.monto_m=null;
    this.numero_m=null;
    this.result ="";}
  
   async recargar(): Promise<any>
   {    
     if(this.monto_m!=null&&this.numero_m!=null){
  try{                //*108*             MONTO                 NUMERO              PIN #
    this.result += '*108*'  + this.monto_m + '*' + this.numero_m + "*" + this.servicio.pin +'#';
    console.log(this.result);  
    await this.call.callNumber(String(this.result), true);   
  }
  catch(e){
  console.error(e);
  }   
   
  }else{
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',      
      message: 'LLENE LOS CAMPOS',
      buttons: ['OK']
    });
    await alert.present();
  this.limpiar();

  }}


  
  }
  