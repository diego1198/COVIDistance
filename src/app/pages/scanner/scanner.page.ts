import { Component, OnInit, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { dispositivos } from '../scanner/dispositivos';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  displayString: any[] = [];
  devices: any[] = [];
  dispositivos1: dispositivos[] = [];
  cercanos:dispositivos[]=[];

  constructor(private ble: BLE, private ngZone: NgZone) {
  }

  Scan() {
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

      } else if (device.rssi > -65) {
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
    })
  }

}
