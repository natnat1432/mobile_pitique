import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { NavController } from '@ionic/angular';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private storage:StorageService,
    private http:HttpClient,
    private navCtrl:NavController,
  ) { }

    async saveSession(data:any){
      for(const key in data){
        if(key !== 'success' && key !== 'message'){
          this.storage.set(key,data[key])
        }
      }

      if(data.user_type == 'pitiquer'){
        this.navCtrl.navigateForward('/pitiquer-home')
      }
      
      if(data.user_type == 'realtor'){
        this.navCtrl.navigateForward('/realtor-home')
      }
    }

    async checkSession() {
   


      const accessToken = await this.storage.get("accessToken")
      const formData = {
        'accessToken': accessToken,
      }
  
      this.http.post(`${environment.serverAPI}/api/auth/token/validate`, formData).subscribe(
        (response: any) => {
          if (response.valid == true) {
            console.log('Session valid')
          }
          else {
            console.log('Session invalid')
            this.refreshToken()
          }
        },
        (error: any) => {
          console.log('Session invalid')
          if (error.error.valid == false) {
            console.log('Refreshing token')
            this.refreshToken()
          }
          else {
            console.warn('Error checking session', error)
          }
        },
      )
    }

    async checkSessionLogin() {
      
      const accessToken = await this.storage.get("accessToken")
      const user_type = await this.storage.get('user_type')
      const formData = {
        'accessToken': accessToken,
      }
  
      this.http.post(`${environment.serverAPI}/api/auth/token/validate`, formData).subscribe(
        (response: any) => {
          if (response.valid === true) {

            if(user_type == 'pitiquer'){
              this.navCtrl.navigateForward('/pitiquer-home')
            }
            if(user_type == 'realtor'){
              this.navCtrl.navigateForward('/realtor-home')
            }
          }
          else {
        
          }
        },
        (error: any) => {
          if (error.error.valid === false) {
          }
          else {
            console.warn('Error checking session', error)
          }
        },
      )
    }


    async refreshToken() {
      const refreshToken = await this.storage.get('refreshToken')
      const formData = {
        'token': refreshToken
      }
      this.http.post(`${environment.serverAPI}/api/auth/token`, formData).subscribe(
        (response: any) => {
          if (response.valid === true && response.success === true) {
            this.storage.set('accessToken', response.accessToken)
          }
        },
        (error) => {
          if (error.error.valid === false || error.error.success === false) {
            this.storage.clear()
            this.navCtrl.navigateRoot('/login')
          }
  
          console.warn('Error refreshing token', error)
        }
      )
    }

    async logout() {
      const refreshToken = await this.storage.get('refreshToken')
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': refreshToken,
        })
      }
      this.http.delete(`${environment.serverAPI}/api/auth/logout`, options).subscribe(
        (response: any) => {
          this.storage.clear()
          this.navCtrl.navigateRoot('/login')
        },
        (error) => {
          console.warn(error)
        }
      )
    }


  
}
