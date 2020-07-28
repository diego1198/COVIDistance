import { Component, OnInit, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  displayString: any[]=[];
  devices:any[] = [];
 
  constructor(private ble:BLE,private ngZone: NgZone) 
  {
  }

  Scan(){
    this.devices = [];
    this.ble.scan([],15).subscribe(
      device => this.onDeviceDiscovered(device)
    );
    
    
  }
  
  
  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device)
      console.log(device)
    })
    for(let i=0; i<this.devices.length; i++){
      if(this.devices[i].rssi>-51){
        this.displayString.push("Muy cerca");
      }else if(this.devices[i].rssi>-65){
        this.displayString.push("Cerca");
      }else{
        this.displayString.push("Lejos");
      }
    }
  }
  
}
