import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.prod';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-realtor-home',
  templateUrl: './realtor-home.page.html',
  styleUrls: ['./realtor-home.page.scss'],
})
export class RealtorHomePage implements OnInit {
  @ViewChild(IonModal) notificationModal: any;
  private subscription: Subscription;
  pageTitle:string = 'home'
  serverAPI = environment.serverAPI
  pitiquerData:any
  notifications = []
  totalNotifications = -1
  unreadNotifications = 0
  skeletonNotification = 5
  constructor(
    private navCtrl:NavController,
    private session:SessionService,
    private http:HttpClient,
    private storage:StorageService

  ) { 
    this.getPitiquers()

    
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


  viewPitiquer(ptqr_id:number){
    this.navCtrl.navigateForward(['/realtor-view-pitiquer',{
    ptqr_id:ptqr_id
    
    }])
  }

  async getPitiquers(){
    const accessToken = await this.storage.get("accessToken")
      const options = {
      headers: {
        'authorization': `Bearer ${accessToken}`
      }
    }
    const response = this.http.get(`${this.serverAPI}/api/pitiquer/`, options).toPromise()
    const loadingPromise = new Promise(resolve => setTimeout(resolve, 200))
    return await Promise.all([response, loadingPromise]).then(
      async([response]: any) => {
        if(response.data){
          for(let each of response.data){
            each["images"] = await this.getPortfolioImages(each.ptqr_email)
            each["minprice"] = await this.getPitiquerMinPrices(each.ptqr_id)
            const rating = await this.getPitiquerRating(each.ptqr_id)
            each["rating"] = rating.rating
            each["totalratings"] = rating.totalratings
          }
        }
      this.pitiquerData = response.data
      console.log(this.pitiquerData)
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  async getPortfolioImages(email:string) {
    const accessToken = await this.storage.get('accessToken');
    const options = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const response = this.http
      .get(`${environment.serverAPI}/api/pitiquer/portfolio/${email}`, options)
      .toPromise();
    const loadingPromise = new Promise((resolve) => setTimeout(resolve, 200));

    return await Promise.all([response, loadingPromise]).then(
      ([response]: any) => {
        return response.data
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async getPitiquerMinPrices(ptqr_id:number){
    const accessToken = await this.storage.get("accessToken");
    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }
    const response = this.http.get(`${this.serverAPI}/api/pitiquer/${ptqr_id}/minprice`, options).toPromise();
    const loadingPromise = new Promise((resolve) => setTimeout(resolve, 200));
    return await Promise.all([response, loadingPromise]).then(
      ([response]: any) => {
        return response.min_price
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async getPitiquerRating(ptqr_id:number){
    const accessToken = await this.storage.get("accessToken");
    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }
    const response = this.http.get(`${this.serverAPI}/api/pitiquer/${ptqr_id}/rating`, options).toPromise();
    const loadingPromise = new Promise((resolve) => setTimeout(resolve, 200));
    return await Promise.all([response, loadingPromise]).then(
      ([response]: any) => {
        return response
      },
      (error) => {
        console.log(error);
      }
    );
  }


  
  async getUnreadNotifications(){
    const rltr_id = await this.storage.get("id")
    const accessToken = await this.storage.get("accessToken")

    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }

    this.http.get(`${this.serverAPI}/api/realtor/notifications/unread/${rltr_id}`, options).subscribe(
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
    const rltr_id = await this.storage.get("id")
    const accessToken = await this.storage.get("accessToken")

    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }

    const response = this.http.get(`${this.serverAPI}/api/realtor/notifications/${rltr_id}`, options).toPromise()
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
