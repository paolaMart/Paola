import { ServiciosService } from './servicios.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
tigo: number =0;
claro: number=0;
pinclaro: number=0;
  constructor( public ServiciosService: ServiciosService) {}
}
