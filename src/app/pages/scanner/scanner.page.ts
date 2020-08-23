import { Component, OnInit, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { dispositivos } from '../../shared/dispositivos.interface';
import {  Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocalNotificationService } from '../../services/local-notification.service';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  displayString: any[] = [];
  devices: any[] = [];
  dispositivos1: dispositivos[] = [];
   public cercanos:dispositivos[]=[];
   ocultar1: boolean     = true;
   lat:number;
  lon:number;
  total:string;
  ocultar2: boolean     = true;

  constructor(private ble: BLE, private ngZone: NgZone,private notification: LocalNotificationService, public geolocation: Geolocation) {
    this.getGeolocation();
    this.ocultar2=false;
  }
  getGeolocation(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
    });
  }

  Scan() {
    this.ocultar2=true;
    this.ocultar1=false;
    this.devices = [];
    this.displayString = [];
    this.dispositivos1 = [];
    this.cercanos=[];
    this.ble.scan([], 15).subscribe(
      device => this.onDeviceDiscovered(device)
    );
  }

  onDeviceDiscovered(device) {
    console.log('Discovered' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device)
      let aux = "";
      console.log(device)
      
      if (device.rssi > -51) {
        this.displayString[this.devices.length - 1] = ("Muy cerca");
        aux = ("Muy cerca");
        let cercania: dispositivos;
        cercania = {
          name: device.name,
          id: device.id,
          rssi: device.rssi,
          cercania: aux
        };
        this.cercanos.push(cercania);

      } else if (device.rssi > -69) {
        this.displayString[this.devices.length - 1] = ("Cerca");
        aux = ("Cerca");
        let cercania: dispositivos;
        cercania = {
          name: device.name,
          id: device.id,
          rssi: device.rssi,
          cercania: aux
        };
        this.cercanos.push(cercania);
      } else {
        this.displayString[this.devices.length - 1] = ("Lejos");
        aux = ("Lejos");
      }
      let dispositivo: dispositivos;
      dispositivo = {
        name: device.name,
        id: device.id,
        rssi: device.rssi,
        cercania: aux
      };
      this.dispositivos1.push(dispositivo);
    }
    )
    this.notification.scheduleNotification(this.cercanos);
  }

}
