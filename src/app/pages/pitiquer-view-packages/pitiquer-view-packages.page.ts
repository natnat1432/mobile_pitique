import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-pitiquer-view-packages',
  templateUrl: './pitiquer-view-packages.page.html',
  styleUrls: ['./pitiquer-view-packages.page.scss'],
})
export class PitiquerViewPackagesPage implements OnInit {
  isLoading: boolean = false;
  pageTitle: string = '';
  pitiquerEmail:string = ''
  serverAPI:string = environment.serverAPI
  packages:any[] = []
  constructor(
    private navController: NavController,
    private storage: StorageService,
    private http: HttpClient,
    private util:UtilService,
    private alertController:AlertController,
  ) {
   }

  async ngOnInit() {
    this.pitiquerEmail = await this.storage.get('email');
  }

  ionViewWillEnter() {
    this.getPackages()

  }

  navigateProfile() {
    this.navController.navigateBack(['user-profile']);
  }

  addPackage(){
    this.navController.navigateForward(['pitiquer-add-package'])
  }
  viewPackage(pkg_id:number){
    this.navController.navigateForward(["pitiquer-view-package",{
      id:pkg_id
    }])
  }
  async deletePackage(pkg_id:number){
    console.log(pkg_id)
    const alert = await this.alertController.create({
      header: 'Delete Package',
      message: 'Are you sure you want to delete this package?',
      buttons: [ {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'Yes',
        role: 'confirm',
        handler: async() => {
          this.isLoading = true
          const accessToken = await this.storage.get("accessToken")
          const options = {
            headers:{
              authorization:`Bearer ${accessToken}`
            }
          }
          this.http.delete(`${this.serverAPI}/api/pitiquer/package/${pkg_id}`, options).subscribe(
            async(response:any) => {
              console.log(response)
              this.isLoading = false
              await this.getPackages()
            },
            (error:any) => {
              this.isLoading = false
              console.log(error)
            }
          )
        },
      },],
    });
    await alert.present();
  }


  async getPackages(){
    const accessToken = await this.storage.get("accessToken")
    const id = await this.storage.get("id")

    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }
    this.http.get(`${this.serverAPI}/api/pitiquer/package/${id}`, options).subscribe(
      (response:any)=>{
        console.log(response)
        this.packages = response
     
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
