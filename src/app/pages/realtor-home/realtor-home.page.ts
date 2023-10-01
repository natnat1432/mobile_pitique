import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-realtor-home',
  templateUrl: './realtor-home.page.html',
  styleUrls: ['./realtor-home.page.scss'],
})
export class RealtorHomePage implements OnInit {
  pageTitle:string = 'home'
  constructor(
    private navCtrl:NavController,
    private session:SessionService,
  ) { }

  async ngOnInit() {
    await this.session.checkSession()
  }


  viewPitiquer(){
    this.navCtrl.navigateForward('/realtor-view-pitiquer')
  }

}
