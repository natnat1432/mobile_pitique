import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pitiquer-add-package',
  templateUrl: './pitiquer-add-package.page.html',
  styleUrls: ['./pitiquer-add-package.page.scss'],
})
export class PitiquerAddPackagePage implements OnInit {
  isLoading: boolean = false
  pageTitle: string = ''
  pitiquerEmail:string = ''
  serverAPI = environment.serverAPI
  pitiquerData:any
  packageForm = new FormGroup({
    pkg_name:new FormControl("", Validators.required),
    pkg_min_price:new FormControl("",Validators.required),
    pkg_desc:new FormControl("", Validators.required),
    pkg_isphotog: new FormControl(false),
    pkg_isphotoedt: new FormControl(false),
    pkg_isvideog: new FormControl(false),
    pkg_isvideogedt: new FormControl(false),
    pkg_isamnty: new FormControl(false),
    pkg_isamntyedt: new FormControl(false),
  })
  constructor(
    private navController: NavController,
    private storage: StorageService,
    private http: HttpClient,
    private util:UtilService,
  ) { }

  async ngOnInit() {
    await this.getPitiquer()
  }

  navigateViewPackages(){
    this.navController.navigateBack([`pitiquer-view-packages`])
  }

  async getPitiquer(){
    this.isLoading = true

    const accessToken = await this.storage.get("accessToken")
    const id = await this.storage.get("id")
    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }
    const response = this.http.get(`${this.serverAPI}/api/pitiquer/${id}`, options).toPromise()
    const loadingPromise = new Promise(resolve => setTimeout(resolve, environment.loadingtime))


    return await Promise.all([response,loadingPromise])
      .then(
        ([response]:any)  =>{
          this.isLoading = false
          if(response.data){
            console.log(response.data)
            this.pitiquerData = response.data
          }
        },
        (err) =>{
          this.isLoading = false
          console.log(err)
        }
      )
  }

  async addPackageData(){
    this.isLoading = true

    const accessToken = await this.storage.get("accessToken")
    const id = await this.storage.get("id")
    let formData:any = this.packageForm.value
    formData["ptqr_id"] = id
    formData["pkg_isavailable"] = true
    formData["pkg_isvisible"] = true
    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }

  //   const response = this.http.get(`${this.serverAPI}/api/pitiquer/${id}`, options).toPromise()
  //   const loadingPromise = new Promise(resolve => setTimeout(resolve, environment.loadingtime))


  //   return await Promise.all([response,loadingPromise])
  //     .then(
  //       ([response]:any)  =>{
  //         this.isLoading = false
  //         if(response.data){
  //           console.log(response.data)
  //           this.pitiquerData = response.data
  //         }
  //       },
  //       (err) =>{
  //         this.isLoading = false
  //         console.log(err)
  //       }
  //     )

  // }
  }

}
