import { AlertController } from '@ionic/angular';
import { AppComponent } from './../app.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { ServiciosService } from '../servicios.service';
import { Location } from '@angular/common';

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
  private name: string;
  private globalColor: string;
  private color: string;
  private header: string;
  private ser;
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
    public alertController: AlertController,
    public appComponent: AppComponent,
    public  formBuilder: FormBuilder,
    private call: CallNumber,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private servicio: ServiciosService,
    private router: Router,
    private location: Location
    ){
    this.ser = this.servicio;
    this.acceso = '123';
    //login
    if(!localStorage.getItem('permiso')) {
      localStorage.setItem('permiso', 'login');
      this.permiso = localStorage.getItem('permiso');
    }else{
      this.permiso = localStorage.getItem('permiso');
    }

    //datos de la sesion
    if(localStorage.getItem('dataUser')) {
      this.name = JSON.parse(localStorage.getItem('dataUser')).usuario;
      this.pin = JSON.parse(localStorage.getItem('dataUser')).pin;
    }
    //color
    if(!localStorage.getItem('theme')){
      localStorage.setItem('theme', 'tigo');
      this.globalColor = JSON.parse(localStorage.getItem('color'));
    }else{
      this.servicio.setColor();
      this.header = this.servicio.theme.head;
      this.color = this.servicio.theme.col;
    }

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this.location.isCurrentPathEqualTo('/home')) {
        navigator['app'].exitApp();
        processNextHandler();
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.ser.setColor();
    this.header = this.ser.theme.head;
    this.color = this.ser.theme.col;
  }

  setColor(){
    if(this.permiso === 'login'){ this.color = 'tigo'; }
    else if(this.permiso === 'panel'){
      this.ser.setColor();
      this.header = this.ser.theme.head;
      this.color = this.ser.theme.col;
   }
  }

  limpiar(){ this.result = ''; }

  async codeRecarga(pos): Promise<any>{
    try {
      this.result = [
        '*109*1*',
        '*109*2*',
        '*109*3*',
        '*109*5*',
      ][pos] + this.pin + '#';

      await this.call.callNumber(String(this.result), true);
      this.limpiar();
    }
    catch(e){ console.error(e); }
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
  saldoDisponible(){
    this.codeRecarga(0);
  }

  //ULTIMA RECARGA
  ultimaRecarga(){
    this.codeRecarga(1);
  }

  //TOTAL DE VENTAS
  totalDeVentas(){
    this.codeRecarga(2);
  }

  //REVERSION DE RECARGA
  reversionDeRecarga(){
    this.codeRecarga(3);
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
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
