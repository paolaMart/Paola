import { AlertController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ServiciosService } from '../servicios.service';


@Component({
  
  selector: 'app-paquetes',
  templateUrl: './paquetes.page.html',
  styleUrls: ['./paquetes.page.scss'],
})
export class PaquetesPage implements OnInit {

  //recarga electronica
  numero: String;
  numero_m: String;
  monto_m: String;
  result: String ="";
  select: [];
  select2: [];
  paquete: number;
  tipo: number;
  p:number;
  aa:number;
  cod:string="";
  
  public pin: any[] = [];

 
  constructor(public alertController: AlertController ,public ServiciosService: ServiciosService, private call: CallNumber) { }

  ngOnInit() {
    
  }  

  
  paquet = []
  
  sel_paquete = {
    
    '1': ['20 MINUTOS 1D C$20','C$30 HABLA+2LLAMADA ILIMI+WA 2D' ,'C$50 HABLA+4LLAMADA ILIMI+WA 4D' ,'20 MINUTOS COSTA RICA 1D C$20' ,'20 MINUTOS USA Y CANADA 1D C$20'], 
    '2': ['C$20 CHAT2 MENSAJES ILIM 2D'],
    '3': ['C$20-450MB+20MINTIGO CA Y USA+WA 1D','C$30-700MB+30MINTIGO CA Y USA+WA 2D' ,'C$50-2.2GB+80MINTIGO CA Y USA+REDES 4D' ,'C$70-3GB+LLAM ILIM TIGO+REDES 5D' ,'C$100-4GB+LLAM ILIM TIGO+REDES 7D', 'C$200-6.2GB+LLAM ILIM TIGO+REDES 15D'],
    '4': ['C$40-2GBJUEGOS+700MB+30MIN-CA-USA+WA 2D', 'C$80-5GBJUEGOS+3GB+MINILIM+REDES 5D', 'C$120-7GBJUEGOS+4GB+MINILIM+REDES 7D'],
    '5': ['C$100-4GB+30MINMULTIUSO+LLAMADILIM+REDES 7D', 'C$300-9GB+50MINMULTIUSO+LLAMADILIM+REDES 15D']
}




  seleccionatipo(value: number) {
    this.paquet= this.sel_paquete[value];
    this.tipo=value;
   // console.log(this.tipo);
  }
  seleccionapaq(id: number){
    this.paquete=id;
  this.p=this.sel_paquete[this.tipo][this.paquete-1];
    this.aa=0;
  }
limpiar(){
  this.aa=null;
  this.p=null;
  this.tipo=0;
  this.paquete= 0;
  this.numero= null
  this.monto_m=null;
  this.numero_m=null;
   this.result ="";
  this.select=null;
  this.select2=null;
  this.paquet = [];
}

  async enviarpaq(): Promise<any>
  {    
    
    if(this.numero!=null&&this.select!=null&&this.select2!=null){
  //MINUTOS
    if(this.tipo==1 && this.paquete==1){
      
      try{              //*110*cod*           //numero              //pin # 
        this.result += '*110*1*' + this.numero + '*' + this.ServiciosService.pin + '#';
        console.log(this.result);this.cod='*110*1*';
        await this.call.callNumber(String(this.result), true);
        
      }
      catch(e){
        console.error(e);
      }
    }
      else  if(this.tipo==1 && this.paquete==2){
        try{
          this.result += '*110*2*' + this.numero + '*' + this.ServiciosService.pin + '#';
          console.log(this.result);
          this.cod='*110*2*';
        await this.call.callNumber(String(this.result), true);
        }
        catch(e){
          console.error(e);
        }
      }
  
      else if(this.tipo==1 && this.paquete==3){
        this.cod='*110*3*';
  
        try{              //*110*cod*           //numero              //pin # 
          this.result += '*110*3*' + this.numero + '*' + this.ServiciosService.pin + '#';
          console.log(this.result);
          await this.call.callNumber(String(this.result), true);
        }
        catch(e){
          console.error(e);
        }
      }
  
      else if(this.tipo==1 && this.paquete==4){
        this.cod='*110*5*';
  
        try{              //*110*cod*           //numero              //pin # 
          this.result += '*110*5*' + this.numero + '*' + this.ServiciosService.pin + '#';
          console.log(this.result);
          await this.call.callNumber(String(this.result), true);
        }
        catch(e){
          console.error(e);
        }
      }
  
      else if(this.tipo==1 && this.paquete==5){
        this.cod='*110*6*';
  
        try{              //*110*cod*           //numero              //pin # 
          this.result += '*110*6*' + this.numero + '*' + this.ServiciosService.pin + '#';
          console.log(this.result);
          await this.call.callNumber(String(this.result), true);
        }
        catch(e){
          console.error(e);
        }
      }
  
  //MENSAJES
  else if(this.tipo==2 && this.paquete==1){
    this.cod='*110*4*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*4*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  
  //MEGAPACKS
  
  else if(this.tipo==3 && this.paquete==1){
    this.cod='*110*7*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*7*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  
  else if(this.tipo==3 && this.paquete==2){
    this.cod='*110*8*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*8*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  
  else if(this.tipo==3 && this.paquete==3){
    this.cod='*110*9*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*9*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  
  else if(this.tipo==3 && this.paquete==4){
    this.cod='*110*10*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*10*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  
  else if(this.tipo==3 && this.paquete==5){
    this.cod='*110*11*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*11*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  
  else  if(this.tipo==3 && this.paquete==6){
    this.cod='*110*12*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*12*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  
  
  //GAMER
  else  if(this.tipo==4 && this.paquete==1){
    this.cod='*110*13*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*13*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  
  else  if(this.tipo==4 && this.paquete==2){
    this.cod='*110*14*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*14*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  else  if(this.tipo==4 && this.paquete==3){
    this.cod='*110*15*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*15*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  
  //PLUS
  else  if(this.tipo==5 && this.paquete==1){
    this.cod='*110*16*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*16*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  
  else  if(this.tipo==5 && this.paquete==2){
    this.cod='*110*17*';
  
    try{              //*110*cod*           //numero              //pin # 
      this.result += '*110*17*' + this.numero + '*' + this.ServiciosService.pin + '#';
      console.log(this.result);
      await this.call.callNumber(String(this.result), true);
    }
    catch(e){
      console.error(e);
    }
  }
  
  
  
  else{ const alert = await this.alertController.create({
    cssClass: 'my-custom-class',      
    message: 'HA OCURRIDO UN ERROR AL EJECUTAR EL CODIGO',
    buttons: ['OK']
  });
  await alert.present();
this.limpiar();
  }
  
  
  
  }
  else{

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',      
      message: 'LLENE LOS CAMPOS',
      buttons: ['OK']
    });
    await alert.present();
  this.limpiar();}


}
  



}