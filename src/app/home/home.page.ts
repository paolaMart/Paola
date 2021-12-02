import { AlertController, Platform } from '@ionic/angular';
import { AppComponent } from './../app.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private permiso: string;
  private acceso: string;
  private pin: string;
  private result: string;
  private subscribe: any;
  private name: string;
  private color: string;
  private dataAccion = [
    {
      name: 'SALDO DISPONIBLE',
      method: 'saldoDisponible',
      description: 'Consulta tu saldo Prepago disponible',
      icon: 'speedometer'
    },
    {
      name: 'ÚLTIMA RECARGA',
      method: 'ultimaRecarga',
      description: 'Mostrar información de la ultima recarga',
      icon: 'phone-portrait'
    },
    {
      name: 'TOTAL DE VENTAS',
      method: 'totalDeVentas',
      description: 'Consulta de los ingresos diarios',
      icon: 'logo-usd'
    },
    {
      name: 'REVERSIÓN DE RECARGA',
      method: 'reversionDeRecarga',
      description: 'Cancelar recarga',
      icon: 'repeat'
    },
  ];


  constructor(
    public platform: Platform,
    public alertController: AlertController,
    public appComponent: AppComponent,
    public  formBuilder: FormBuilder,
    private call: CallNumber,
    private activatedRoute: ActivatedRoute
    ){

    this.acceso = '123';

    if(!localStorage.getItem('permiso')) { localStorage.setItem('permiso', 'login'); }
    else { this.permiso = localStorage.getItem('permiso'); }

    if(localStorage.getItem('dataUser')) {
      this.name = JSON.parse(localStorage.getItem('dataUser')).usuario;
      this.pin = JSON.parse(localStorage.getItem('dataUser')).pin;
    }

    this.setColor();

    // this.subscribe = this.platform.backButton.subscribeWithPriority(666666,()=>{
    //   if(this.constructor.name === 'HomePage'){
    //       navigator["app"].exitApp();
    //   }
    // });
  }

  setColor(){
    if(this.permiso === 'login'){ this.color = 'tigo'; }
    else if(this.permiso === 'panel'){ this.color = 'subTigo'; }
  }

  limpiar(){ this.result = ''; }

  codeRecarga(pos){
    return [
      '*109*1*',
      '*109*2*',
      '*109*3*',
      '*109*5*',
    ][pos] + this.pin + '#';
  }

  methodCall(evento){
    switch(evento){
        case 'saldoDisponible':
          this.saldoDisponible();
          break;
        case 'ultimaRecarga':
          this.ultimaRecarga();
          break;
        case 'totalDeVentas':
          this.totalDeVentas();
          break;
        case 'reversionDeRecarga':
          this.reversionDeRecarga();
          break;
    }
  }

  //SALDO DISPONIBLE
  async saldoDisponible(): Promise<any>{
    try{
      this.result += this.codeRecarga(0);
      await this.call.callNumber(String(this.result), true);
      this.limpiar();
    }
    catch(e){ console.error(e); }
  }

  //ULTIMA RECARGA
  async ultimaRecarga(): Promise<any>{
    try{
      this.result += this.codeRecarga(1);
      await this.call.callNumber(String(this.result), true);
      this.limpiar();
    }
    catch(e) { console.error(e); }
  }

  //TOTAL DE VENTAS
  async totalDeVentas(): Promise<any>{
    try{
      this.result += this.codeRecarga(2);
      await this.call.callNumber(String(this.result), true);
      this.limpiar();
    }
    catch(e){ console.error(e); }
  }

  //REVERSION DE RECARGA
  async reversionDeRecarga(): Promise<any>{
    try{
      this.result += this.codeRecarga(3);
      await this.call.callNumber(String(this.result), true);
      this.limpiar();
    }
    catch(e) { console.error(e); }
  }

  async accesoApp() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Acceder a tiGo',
      inputs: [
        {
          name: 'usuario',
          type: 'text',
          placeholder: 'Nombre de usuario'
        },
        {
          name: 'codigo',
          type: 'password',
          placeholder: 'Codigo de acceso'
        },
        {
          name: 'pin',
          type: 'number',
          placeholder: 'Pin'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (data) => {
            if(!data.usuario || !data.codigo || !data.pin){
              const error =  this.alertController.create({
                cssClass: 'my-custom-class',
                message: 'TODOS LOS CAMPOS SON REQUERIDOS',
                buttons: ['OK']
              });

              (await error).present();
              return;
            }

            if(data.codigo === this.acceso){
              localStorage.setItem('permiso','panel');
              this.permiso = localStorage.getItem('permiso');
              this.setColor();
              if(!localStorage.getItem('dataUser')){
                localStorage.setItem('dataUser', JSON.stringify(data));
                this.pin = JSON.parse(localStorage.getItem('dataUser')).pin;
              }
              this.name = JSON.parse(localStorage.getItem('dataUser')).usuario;
              console.log(this.name);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }
}
