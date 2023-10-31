import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pitiquer-view-package',
  templateUrl: './pitiquer-view-package.page.html',
  styleUrls: ['./pitiquer-view-package.page.scss'],
})
export class PitiquerViewPackagePage implements OnInit {
  isLoading: boolean = false
  pageTitle: string = ''
  pitiquerEmail:string = ''
  serverAPI = environment.serverAPI
  pitiquerData:any
  package_id:any



  packageForm = new FormGroup({
    pkg_id:new FormControl(""),
    pkg_name:new FormControl("", Validators.required),
    pkg_min_price:new FormControl("",Validators.required),
    pkg_desc:new FormControl("", Validators.required),
    pkg_isphotog: new FormControl(false),
    pkg_isphotoedt: new FormControl(false),
    pkg_isvideog: new FormControl(false),
    pkg_isvideogedt: new FormControl(false),
    pkg_isamnty: new FormControl(false),
    pkg_isamntyedt: new FormControl(false),
    pkg_isavailable:new FormControl(false),
    pkg_isvisible:new FormControl(false),
    ptqr_id:new FormControl("")
  })
  constructor(
    private navController: NavController,
    private storage: StorageService,
    private http: HttpClient,
    private util:UtilService,
    private activatedRoute:ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((data:any) => {
      this.package_id = data.params["id"]
    })
   }

  async ngOnInit() {
    await this.getPitiquer()
    await this.getPackageData(this.package_id)
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

  async getPackageData(pkg_id:number){
    const accessToken = await this.storage.get('accessToken');
    const options = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    this.http.get(`${this.serverAPI}/api/pitiquer/package/get/${pkg_id}`, options).subscribe(
      (response:any) => {
        console.log(response)
        this.packageForm.setValue({
          pkg_id:response.pkg_id,
          pkg_name:response.pkg_name,
          pkg_min_price:response.pkg_min_price,
          pkg_desc:response.pkg_desc,
          pkg_isphotog:response.pkg_isphotog,
          pkg_isphotoedt:response.pkg_isphotoedt,
          pkg_isvideog:response.pkg_isvideog,
          pkg_isvideogedt:response.pkg_isvideogedt,
          pkg_isamnty:response.pkg_isamnty,
          pkg_isamntyedt:response.pkg_isamntyedt,
          pkg_isavailable:response.pkg_isavailable,
          pkg_isvisible:response.pkg_isvisible,
          ptqr_id:response.ptqr_id,
        })
        
      },
      (error) => {
        console.log(error)
      }
    )
  }
  
  async updatePackageData(){
    this.isLoading = true
    const id = await this.storage.get('id');
    const accessToken = await this.storage.get('accessToken');

    const options = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    let formData:any = this.packageForm.value
  
    const response = this.http.put(`${this.serverAPI}/api/pitiquer/package/update/${formData["pkg_id"]}`, formData,options).toPromise()
    const loadingPromise = new Promise(resolve => setTimeout(resolve, environment.loadingtime))


    return await Promise.all([response,loadingPromise])
      .then(
        ([response]:any)  =>{
          this.isLoading = false
          if(response.message){
            this.util.presentAlert("Update Package","",response.message)
            this.navController.navigateRoot(["pitiquer-view-packages"])
          }
        },
        (err) =>{
          this.isLoading = false
          console.log(err)
        }
      )
  }
}
