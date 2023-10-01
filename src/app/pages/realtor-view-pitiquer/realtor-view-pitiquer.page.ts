import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-realtor-view-pitiquer',
  templateUrl: './realtor-view-pitiquer.page.html',
  styleUrls: ['./realtor-view-pitiquer.page.scss'],
})
export class RealtorViewPitiquerPage implements OnInit {

  constructor(
    private navCtrl:NavController,
    private session:SessionService
  ) { }

  async ngOnInit() {
    await this.session.checkSession()
  }

  navigateHome(){
    this.navCtrl.navigateRoot('/realtor-home')
  }

  swiperSlideChanged(e:any){
    console.log('changed',e);
  }

  bookPitiquer(){
    this.navCtrl.navigateForward('/realtor-book-pitiquer-location')
  }
}
