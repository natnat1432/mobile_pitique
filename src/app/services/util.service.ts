import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private toastController:ToastController,
    private alertController:AlertController
    ) { }

  getYearOptions()
  {
    const startYear = 1924
    const endYear = new Date().getFullYear()
    const years:number[] = []

    for(let year = endYear; year>=startYear;year--){
      years.push(year)
    }
    return years
  }

  async presentToast(position:'top'|'middle'|'bottom', message:string)
  {
    const toast = await this.toastController.create({
      message:message,
      duration:1500,
      position:position,
    });
    await toast.present();
  }

  async presentAlert(header:string, subHeader:string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}

