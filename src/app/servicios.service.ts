
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  public theme;
  constructor(public alertController: AlertController) {}

  setColor(){
    switch(localStorage.getItem('theme')){
      case 'tigo':
        this.theme = {head: localStorage.getItem('theme'), col: 'subTigo'};
        break;
      case 'danger':
        this.theme = {head: localStorage.getItem('theme'), col: 'tigo'};
        break;
      case 'success':
        this.theme = {head: localStorage.getItem('theme'), col: 'cafe'};
        break;
      case 'warning':
        this.theme = {head: localStorage.getItem('theme'), col: 'lightBlue'};
        break;
    }
  }
}
