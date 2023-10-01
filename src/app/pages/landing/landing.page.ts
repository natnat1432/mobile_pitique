import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private router:Router,
    private navCtrl:NavController,
    private session:SessionService
  ) { }

  async ngOnInit() {
    await this.session.checkSessionLogin()
  }



  navigateLogin()
  {
    
    this.navCtrl.navigateForward('/login',{ animated: true, animationDirection: 'forward' })
  }
  navigateSignup()
  {
    this.navCtrl.navigateForward('/registration',{ animated: true, animationDirection: 'forward' })
  }

}
