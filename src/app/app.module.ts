//import { HomePageModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

//import { HomePage } from './home/home.page';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CallNumber } from '@ionic-native/call-number/ngx';



import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [FormsModule,  ReactiveFormsModule , BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
  //  HomePage,
    CallNumber, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }
   
   
 ],
 bootstrap: [AppComponent],
})
export class AppModule {}
