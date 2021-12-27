import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit {

  private check = {tigo: '', success: '', primary: '', warning: ''};
  private header: string;
  private color: string;
  private ser;

  constructor(private servicio: ServiciosService) {
    this.ser = this.servicio;
    this.setTheme(localStorage.getItem('theme'));
  }

  ngOnInit() {
  }

  setTheme(theme: string){
    switch(theme){
      case 'tigo':
        localStorage.setItem('theme','tigo');
        this.setColor();
        this.objClear(this.check);
        this.setCheck(localStorage.getItem('theme'));
        break;
      case 'danger':
        localStorage.setItem('theme','danger');
        this.setColor();
        this.objClear(this.check);
        this.setCheck(localStorage.getItem('theme'));
        break;
      case 'success':
        localStorage.setItem('theme','success');
        this.setColor();
        this.objClear(this.check);
        this.setCheck(localStorage.getItem('theme'));
        break;
      case 'warning':
        localStorage.setItem('theme','warning');
        this.setColor();
        this.objClear(this.check);
        this.setCheck(localStorage.getItem('theme'));
        break;
    }
  }

  setCheck(checkArrow){
    this.check[checkArrow] = '✔️';
  }

  objClear(object){
    // eslint-disable-next-line guard-for-in
    for(const property in object){
      object[property] = '';
    }
  }

  setColor(){
    this.ser.setColor();
    this.header = this.ser.theme.head;
    this.color = this.ser.theme.col;
  }
}
