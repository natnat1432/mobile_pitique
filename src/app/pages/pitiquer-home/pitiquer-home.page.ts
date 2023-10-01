import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-pitiquer-home',
  templateUrl: './pitiquer-home.page.html',
  styleUrls: ['./pitiquer-home.page.scss'],
})
export class PitiquerHomePage implements OnInit {
  pageTitle:string = 'home'
  constructor(
    private session:SessionService
  ) { }

  async ngOnInit() {
    await this.session.checkSession()
  }

}
