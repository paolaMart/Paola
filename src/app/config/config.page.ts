import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  private componentes = [
    {
      icon: 'key',
      name: 'Cambiar pin',
      redirectTo: 'pin'
    },
    {
      icon: 'color-fill',
      name: 'Tema',
      redirectTo: 'theme'
    },  ];
    private header: string;
    private color: string;
    private themeColor;
    private ser;

  constructor(private service: ServiciosService) {
    this.ser = this.service;
    this.service.setColor();
    this.header = this.service.theme.head;
    this.color = this.service.theme.col;
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.ser.setColor();
    this.header = this.ser.theme.head;
    this.color = this.ser.theme.col;
  }
}
