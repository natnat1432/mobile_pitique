import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  implements OnInit {
  user_type:string = ""
  fname:string = ''
  mname:string=''
  lname:string=''
  email:string = ''
  serverAPI:string = environment.serverAPI
  @Input() page: string | undefined;
  constructor(
    private navCtrl:NavController,
    private session:SessionService,
    private storage:StorageService
){

}

async ngOnInit(){
  this.user_type = await this.storage.get("user_type")
  this.fname = await this.storage.get('fname')
  this.mname = await this.storage.get('mname')
  this.lname = await this.storage.get('lname')
  this.email = await this.storage.get('email')

  if(this.mname){
    this.mname = this.mname[0].toUpperCase() + "."
  }

  console.log(this.user_type)
}

navigateHome(){
  if(this.user_type == 'realtor'){
    this.navCtrl.navigateRoot('/realtor-home')
  }
  if(this.user_type == 'pitiquer'){
    this.navCtrl.navigateRoot('/pitiquer-home')
  }
}
navigateProfile(){
  this.navCtrl.navigateRoot('/user-profile')
}
navigateTransactions(){

}
logout(){
    this.session.logout()
}

}
