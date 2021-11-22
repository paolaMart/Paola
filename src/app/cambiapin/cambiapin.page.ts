import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { ServiciosService } from '../servicios.service';
@Component({
  selector: 'app-cambiapin',
  templateUrl: './cambiapin.page.html',
  styleUrls: ['./cambiapin.page.scss'],
})
export class CambiapinPage implements OnInit {
  
cambia_pin: string=null;

  constructor( public alertController: AlertController, public servicio: ServiciosService) { }

  ngOnInit() {
  }

 async cambiarpin(){
  
if(this.cambia_pin=="" || this.cambia_pin==null){
   
        const alert =  this.alertController.create({
          cssClass: 'my-custom-class',      
          message: 'INGRESE UN PIN',
          buttons: ['OK']
        });
         (await alert).present();
         
        }

    

      else{
    localStorage.setItem('pin', JSON.stringify(this.cambia_pin));
    this.servicio.pin=(JSON.parse(localStorage.getItem('pin')));
    this.cambia_pin="";
    }}
}