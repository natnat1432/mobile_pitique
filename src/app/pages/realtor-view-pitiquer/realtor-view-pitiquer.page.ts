import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-realtor-view-pitiquer',
  templateUrl: './realtor-view-pitiquer.page.html',
  styleUrls: ['./realtor-view-pitiquer.page.scss'],
})
export class RealtorViewPitiquerPage implements OnInit {
  ptqr_id:any
  serverAPI = environment.serverAPI
  pitiquerData:any
  constructor(
    private navCtrl:NavController,
    private session:SessionService,
    private activatedRoute:ActivatedRoute,
    private storage:StorageService,
    private http:HttpClient,
  ) { 
    this.activatedRoute.paramMap.subscribe((data:any) => {
      this.ptqr_id = data.params["ptqr_id"]
    })

  }

  async ngOnInit() {
    await this.session.checkSession()
    await this.getPitiquer()
  }

  navigateHome(){
    this.navCtrl.navigateRoot('/realtor-home')
  }

  swiperSlideChanged(e:any){
    // console.log('changed',e);
  }


  bookPitiquer(ptqr_id:number){
    this.navCtrl.navigateForward(['/realtor-book-pitiquer-location',{
    ptqr_id:ptqr_id
    }])
  }


  async getPitiquer(){
    const accessToken = await this.storage.get("accessToken")
    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }

    this.http.get(`${this.serverAPI}/api/pitiquer/${this.ptqr_id}`, options).subscribe(
      async(response:any) => {
   
        this.pitiquerData = response.data

        this.pitiquerData["images"] = await this.getPortfolioImages(this.pitiquerData.ptqr_email)
        const rating = await this.getPitiquerRating(this.pitiquerData.ptqr_id)
        this.pitiquerData["rating"] = rating.rating
        this.pitiquerData["totalratings"] = rating.totalratings
        console.log(this.pitiquerData)

      },
      (error) => {
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

}
