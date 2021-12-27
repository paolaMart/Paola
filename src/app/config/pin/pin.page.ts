import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {

  private pinNew: string;
  private header: string;
  private color: string;

  constructor(private alertController: AlertController, private servicio: ServiciosService) {
    this.servicio.setColor();
    this.header = this.servicio.theme.head;
    this.color = this.servicio.theme.col;
   }

  ngOnInit() {
  }

  async alerta(msj){
    const {titulo,mensaje} = msj;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  //validar pin
  validarPin() {
    if( this.pinNew.toString().length === 4) {
      //validar que el pin no sea el actual
      if(this.pinNew.toString() !== JSON.parse(localStorage.getItem('dataUser')).pin) {
        //guardar nuevo pin en localstorage
        const dataUser = JSON.parse(localStorage.getItem('dataUser'));
        dataUser.pin = this.pinNew.toString();
        localStorage.setItem('dataUser', JSON.stringify(dataUser));
        this.alerta({titulo: 'Pin cambiado', mensaje: 'El pin se ha cambiado correctamente'});
        //limpiar input
        this.pinNew = '';
      }else{
        this.alerta({
          titulo: 'Error',
          mensaje: 'El pin no puede ser igual al actual.'
        });
      }
    }else {
      //mostrar alerta
      this.alerta({
        titulo: 'Error',
        mensaje: 'El pin debe tener 4 digitos.'
      });
    }
  }
}
