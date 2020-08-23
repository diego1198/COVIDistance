import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { dispositivos } from '../shared/dispositivos.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  text = "";
  constructor(private plt:Platform,private notification:LocalNotifications,
    private alertCtrl: AlertController) { 
      this.plt.ready().then(()=>{
        this.notification.on('click').subscribe(res=>{
          let msg = res.data ? res.data.mydata: '';
          this.showAlert(res.title,res.text,msg)
        });

        this.notification.on('trigger').subscribe(res=>{
          let msg = res.data ? res.data.mydata: '';
          this.showAlert(res.title,res.text,msg)
        });
      })
    }

  scheduleNotification(devices:dispositivos[]){
    this.text = "";
    devices.forEach(device =>{this.text += "Dispositivo:"+device.name+"\n Cercania:"+device.cercania+"\n";
    })
    this.notification.schedule({
      id: 1,
      title: 'COVIDistance',
      text: "¡Existen personas muy cerca!\n"+this.text,
      led: 'FF0000',
      smallIcon : "res://mipmap-ldpi/ic_launcher.png",
      sound: this.setSound(),
      foreground: true,
      trigger:{
        in:1,
        unit: ELocalNotificationTriggerUnit.SECOND
      }
    })

  }

  showAlert(header,sub,msg){
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert=>alert.present());
  }

  setSound() {
    if (this.plt.is('android')) {
      return 'file://assets/sounds/sound1.wav'
    } else {
      return 'file://assets/sounds/sound1.wav'
    }
  }

}
