import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pitiquer-view-packages',
  templateUrl: './pitiquer-view-packages.page.html',
  styleUrls: ['./pitiquer-view-packages.page.scss'],
})
export class PitiquerViewPackagesPage implements OnInit {
  isLoading: boolean = false;
  pageTitle: string = '';
  pitiquerEmail:string = ''
  constructor(
    private navController: NavController,
    private storage: StorageService,
    private http: HttpClient,
  ) { }

  async ngOnInit() {
    this.pitiquerEmail = await this.storage.get('email');
  }

  navigateProfile() {
    this.navController.navigateBack(['user-profile']);
  }

  addPackage(){
    this.navController.navigateForward(['pitiquer-add-package'])
  }

}
