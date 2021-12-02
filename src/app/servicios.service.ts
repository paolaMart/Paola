
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  pin: string = null;

  constructor(public alertController: AlertController) {
    if(localStorage.getItem('dataUser')){
      console.log(JSON.parse(localStorage.getItem('dataUser')).pin);
      this.pin = JSON.parse(localStorage.getItem('dataUser')).pin;
    }else{
      this.pin = null;
    }
  }

async Alert() {
  const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'COMPLETE LOS CAMPOS CORRECTAMENTE',
      buttons: ['OK']
    });
    await alert.present();
  };
}
