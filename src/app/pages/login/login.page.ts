import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { UtilService } from 'src/app/services/util.service';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading:boolean = false
  email:string = ""
  pass:string = ""
  accessToken:any
  constructor(
    private navCtrl:NavController,
    private util:UtilService,
    private http:HttpClient,
    private session:SessionService,
    private storage:StorageService
  ) { }

  async ngOnInit() {
    this.accessToken = await this.storage.get("email")
    await this.session.checkSessionLogin()

    console.log(this.accessToken)
  }

  navigateSignup(){
    this.navCtrl.navigateRoot('/registration')
  }

  async loginAccount(){
      if(this.email != "" && this.pass != ""){
        var isFail:boolean = false
        this.isLoading = true
        const formData = {
          user_type:"realtor",
          email:this.email,
          password:this.pass,
        }

        const response = this.http.post(`${environment.serverAPI}/api/auth/login`, formData).toPromise()
        const loadingTime = new Promise(resolve => setTimeout(resolve, environment.loadingtime))
        return await Promise.all([response,loadingTime]).then(
          async ([response]:any) => {
            if(response.success == true && response.message == 'realtor found'){
              this.isLoading = false
              this.session.saveSession(response)
            }
        
            else{
              isFail = true
              const formDataPitiquer = {
                user_type:"pitiquer",
                email:this.email,
                password:this.pass,
              }

              const responsePitiquer = this.http.post(`${environment.serverAPI}/api/auth/login`, formDataPitiquer).toPromise()
              const loadingTimePitiquer = new Promise(resolve => setTimeout(resolve, environment.loadingtime))
              return await Promise.all([responsePitiquer, loadingTimePitiquer]).then(
                ([response]:any) => {
                  this.isLoading = false
                  if(response.success == true && response.message == 'pitiquer found'){
                    this.isLoading = false
                    //set local data here for session 
                    isFail = false
                    this.session.saveSession(response)
                    // console.log(response)
                  }

                  if(isFail){
                    this.util.presentToast("bottom", "Invalid log in")
                  }
                  
                },
                (error:any) => {
                  this.isLoading = false
                  console.error("Error logging in", error)
                }
              )
      
            }
          },
          (error:any) => {
            this.isLoading = false
            console.error("Error logging in", error)
          }
        )
   
      }
      else{
        this.util.presentToast("bottom","Fill in the fields completely")
      }
  }

}
