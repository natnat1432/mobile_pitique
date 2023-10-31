import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { StorageService } from 'src/app/services/storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-pitiquer-home',
  templateUrl: './pitiquer-home.page.html',
  styleUrls: ['./pitiquer-home.page.scss'],
})
export class PitiquerHomePage implements OnInit {
  @ViewChild(IonModal) notificationModal: any;
  private subscription: Subscription;
  pageTitle:string = 'home'
  notifications = []
  unreadNotifications = 0
  totalNotifications = -1
  serverAPI = environment.serverAPI
  constructor(
    private session:SessionService,
    private storage:StorageService,
    private http:HttpClient,
    
  ) {


    this.subscription = interval(5000) 
    .pipe(take(10))
    .subscribe(() => {
      this.getUnreadNotifications();
    });
   }

  async ngOnInit() {
    await this.session.checkSession()
  }

  cancel() {
    this.notificationModal.dismiss(null, 'cancel');
  }

  confirm() {
    this.notificationModal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

    }
  }

  async getUnreadNotifications(){
    const ptqr_id = await this.storage.get("id")
    const accessToken = await this.storage.get("accessToken")

    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }

    this.http.get(`${this.serverAPI}/api/pitiquer/notifications/unread/${ptqr_id}`, options).subscribe(
      (response:any) => {
        this.unreadNotifications = response.unreadNotifications;
      },
      (error) => {
        console.log(error)
      }
    )
  }
  async getNotifications(){
    this.notifications = []
    const ptqr_id = await this.storage.get("id")
    const accessToken = await this.storage.get("accessToken")

    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }

    const response = this.http.get(`${this.serverAPI}/api/pitiquer/notifications/${ptqr_id}`, options).toPromise()
    const loadingPromise = new Promise(resolve => setTimeout(resolve, environment.loadingtime))
    return await Promise.all([response,loadingPromise]).then(
      (response:any) => {
        this.notifications = response[0]
        if(response[0].length == 0){
          this.totalNotifications = 0
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
