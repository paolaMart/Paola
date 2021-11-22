
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
pin: string = null;
  constructor(public alertController: AlertController) { 
  }

    
async Alert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',      
    message: 'COMPLETE LOS CAMPOS CORRECTAMENTE',
    buttons: ['OK']
  });
  await alert.present();}


   

}