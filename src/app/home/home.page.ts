import { AlertController, Platform } from '@ionic/angular';
import { AppComponent } from './../app.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ServiciosService } from '../servicios.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  div;
  
pin_input: string =null;

  cod_acceso: string;
  pin_t: string;  
  subscribe:any;
  result: String ="";
  
  constructor(public platform: Platform, public alertController: AlertController, public AppComponent: AppComponent, public  formBuilder: FormBuilder, public servicio: ServiciosService, private call: CallNumber, private activatedRoute: ActivatedRoute) { 

    if(!localStorage.getItem('div')){
      localStorage.setItem('div', JSON.stringify(1));
      this.div = Number(JSON.parse(localStorage.getItem('div')))

    }
    else{
     this.div = Number(JSON.parse(localStorage.getItem('div')))
    }
    if(!localStorage.getItem('pin')){
      localStorage.setItem('pin', JSON.stringify(this.servicio.pin));
      this.servicio.pin = (JSON.parse(localStorage.getItem('pin')));

    }
    else{
     this.servicio.pin = (JSON.parse(localStorage.getItem('pin')));
    }
   

this.subscribe = this.platform.backButton.subscribeWithPriority(666666,()=>{
  if(this.constructor.name == "HomePage"){
      navigator["app"].exitApp();
  }
})
  }  

  async token(){

    if(this.cod_acceso=='Ani3lk@P@t'){
      localStorage.setItem('div', JSON.stringify(2));
      this.div = Number(JSON.parse(localStorage.getItem('div')));
      this.cod_acceso="";
    }else{
      const alert =  this.alertController.create({
        cssClass: 'my-custom-class',      
        message: 'ACCESO DENEGADO',
        buttons: ['OK']
      });
       (await alert).present();
       
      this.cod_acceso="";
    }
  }
  async pin_ing(){
if(this.pin_input=="" || this.pin_input==null){
   
const alert =  this.alertController.create({
  cssClass: 'my-custom-class',      
  message: 'INGRESE SU PIN',
  buttons: ['OK']
});
 (await alert).present();
 

}
else{ localStorage.setItem('div', JSON.stringify(0));
    this.div = Number(JSON.parse(localStorage.getItem('div')));
    
    localStorage.setItem('pin', JSON.stringify(this.pin_input));
    this.servicio.pin=(JSON.parse(localStorage.getItem('pin')));
    }
  }


  
  limpiar(){
    this.result ="";

  }
  
  //SALDO DISPONIBLE
   async c_saldo(): Promise<any>{
  try{                //codigo*109*cod*     pin #
    this.result += '*109*1*' + this.servicio.pin + '#';
  
  console.log(this.result);
    await this.call.callNumber(String(this.result), true);
  }
  catch(e)
  {
  console.error(e);
  
  } }
  //ULTIMA RECARGA
  async U_recarga():Promise<any>{
    try{                //codigo*109*cod*     pin #
      this.result += '*109*2*' + this.servicio.pin + '#';
    
    console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e)
    {
    console.error(e);
    
    } }
  
  //TOTAL DE VENTAS
  async total_ventas():Promise<any>{
    try{                //codigo*109*cod*     pin #
      this.result += '*109*3*' + this.servicio.pin + '#';
    
    console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e)
    {
    console.error(e);
    
    } }
  
  //REVERSION DE RECARGA
  
  async reversion_rec():Promise<any>{
    try{                //codigo*109*cod*     pin #
      this.result += '*109*5*' + this.servicio.pin + '#';
    
    console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e)
    {
    console.error(e);
    
    } }
  
  
  




  ngOnInit() {

  }



  
  


}