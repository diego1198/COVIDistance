import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* Importaciones para uso de firebase */

import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireModule } from '@angular/fire'

import { firebase } from '../environments/environment'
import { ReactiveFormsModule } from '@angular/forms';
import { BLE } from '@ionic-native/ble/ngx';
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    
            IonicModule.forRoot(),
            AppRoutingModule,
            AngularFireModule.initializeApp(firebase),
            AngularFireAuthModule,
            ReactiveFormsModule],
  providers: [
    
    BLE,
    StatusBar,
    SplashScreen,
    LocalNotifications,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
