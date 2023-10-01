import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-registration-account',
  templateUrl: './registration-account.page.html',
  styleUrls: ['./registration-account.page.scss'],
})
export class RegistrationAccountPage implements OnInit {
  public email:string = ""
  public password:string = ""
  public confirmPassword:string = ""
  public accountType:string = ""

  public month:string = ""
  public monthNum:string = ""
  public day:string = ""
  public year:string=""
 public firstname:string = ""
  public middlename:string = ""
  public lastname:string = ""
  public phone:string = ""
  isLoading:boolean = false
  serverAPI:string = environment.serverAPI

  // public accountColumns = [
  //   {
  //     name: 'accounts',
  //     options: [
  //       {
  //         text: 'Pitiquer',
  //         value: 'Pitiquer',
  //       },
  //       {
  //         text: 'Realtor',
  //         value: 'Realtor',
  //       }
  //       ,
  //       {

  //       }
  //     ]
  //   }
  // ]
  public accountButtons = [
    {
      text:'Cancel',
      role:'cancel',
    }
    ,
    {
      text:'Confirm',
      handler:(value:{accounts:{value:string}}) =>{
        this.accountType = value.accounts.value;
      }
    }
  ]
  constructor(
    private navCtrl: NavController,
    private util: UtilService,
    private storage: StorageService,
    private http:HttpClient,
    private session:SessionService
  ) { }

  async ngOnInit() {
    await this.session.checkSessionLogin()
    
    this.firstname = await this.storage.get('firstname-register')
    this.middlename = await this.storage.get('middlename-register')
    this.lastname = await this.storage.get('lastname-register')
    this.year = await this.storage.get('year-register')
    this.month = await this.storage.get('month-register')
    this.monthNum = await this.storage.get('monthNum-register')
    this.day = await this.storage.get('day-register')
    this.phone = await this.storage.get('phone-register')
    
  }

  navigateRegistration() {
    this.navCtrl.navigateBack('/registration')
  }

  async continueRegistration() {



    if(this.email != "" && this.password != "" && this.confirmPassword != ""){


      if(this.password == this.confirmPassword){
        this.isLoading = true

        const formData = {
            fname:this.firstname,
            mname:this.middlename,
            lname:this.lastname,
            email:this.email,
            pass:this.password,
            phone:this.phone,
            birthdate:`${this.year}-${this.monthNum}-${this.day}`
        }
        const response = this.http.post(`${this.serverAPI}/api/realtor/`, formData).toPromise()
        const loadingPromise = new Promise(resolve => setTimeout(resolve,environment.loadingtime))

        return await Promise.all([response, loadingPromise]).then(
          async ([response]:any) =>{
            this.isLoading = false

            if(response.success == true){
              this.util.presentAlert("Account Registration", "Successful", "You account has been created. Thank you")
              await this.storage.clear()
              this.navCtrl.navigateRoot("/login")
            } 
            else{
              this.util.presentToast("bottom",response.message)
            }
          },
          (error:any) => {
            this.isLoading = false
            console.error("Error registering account", error)
            this.util.presentToast("bottom","Error creating account")
          }
        )
        
      }
      else{
        this.util.presentToast("bottom", "Passwords are not the same")
      }
    }
    else{
      this.util.presentToast("bottom","Incomplete fields")
    }

  }
  navigateLogin() {
    this.navCtrl.navigateRoot('/login')
  }

}
