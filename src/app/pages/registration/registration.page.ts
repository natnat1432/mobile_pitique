import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { StorageService } from 'src/app/services/storage.service';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public month:string = ""
  public monthNum:string = ""
  public day:string = ""
  public year:string=""
  public years:number[] = []
  public isMonthDisabled:boolean = true
  public isDayDisabled:boolean = true
  public firstname:string = ""
  public middlename:string = ""
  public lastname:string = ""
  public phone:string = ""

  public dayColumns:any = [
  ]
  public monthColumns = [
    {
      name:'months',
      options: [
        {
          text: 'January',
          value: '01',
        },
        {
          text: 'February',
          value: '02',
        },
        {
          text: 'March',
          value: '03',
        },
        {
          text: 'April',
          value: '04',
        },
        {
          text: 'May',
          value: '05',
        },
        {
          text: 'June',
          value: '06',
        },
        {
          text: 'July',
          value: '07',
        },
        {
          text: 'August',
          value: '08',
        },
        {
          text: 'September',
          value: '09',
        },
        {
          text: 'October',
          value: '10',
        },
        {
          text: 'November',
          value: '11',
        },
        {
          text: 'December',
          value: '12',
        },
      ]      
    }
  ]
  public monthButtons = [
    {
      text:'Cancel',
      role:'cancel',
    },
    {
      text:'Confirm',
      handler: (value: { months: { text: string, value:string; }; }) =>{
        this.month = value.months.text;
        this.monthNum = value.months.value;
        var days = new Date(parseInt(this.year),parseInt(value.months.value),0).getDate();
        
        var dayTotal:number[] = []
        
        for(let d=1;d<=days;d++)
        { 
          dayTotal.push(d)
        }
        this.dayColumns = [
          {
            name:'days',
            options: dayTotal.map(day=>({
              text:day,
              value:day,
            }))
          }
        ]
        this.isDayDisabled = false
        
      },
    }
  ]

  public dayButtons = [
    {
      text:'Cancel',
      role:'cancel',
    }
    ,
    {
      text:'Confirm',
      handler: (value:{days:{value:string}}) =>{
       this.day = value.days.value
      }
    }
  ]

  public yearColumns:any = []
  public yearButtons = [
    {
      text:'Cancel',
      role:'cancel',
    },
    {
      text:'Confirm',
      handler:(value:{years:{value:string}}) =>{
        this.year = value.years.value
        this.isMonthDisabled = false
      }
    }
  ]
  constructor(
    private navCtrl:NavController,
    private util:UtilService,
    private storage:StorageService,
    private session:SessionService
  ) 
  {

   }

  async ngOnInit() {
  await this.session.checkSessionLogin()
  this.years = this.util.getYearOptions()
  this.yearColumns = [
    {
      name:'years',
      options:this.years.map(year=>({
        text:year.toString(),
        value:year.toString(),
      })),
    },
  ]

  
  this.firstname = await this.storage.get('firstname-register')
  this.middlename = await this.storage.get('middlename-register')
  this.lastname = await this.storage.get('lastname-register')
  this.year = await this.storage.get('year-register')
  this.month = await this.storage.get('month-register')
  this.monthNum = await this.storage.get('monthNum-register')
  this.day = await this.storage.get('day-register')
  this.phone = await this.storage.get('phone-register')
  }

  navigateLanding(){
    this.navCtrl.navigateBack('')
  }

  navigateLogin(){
    this.navCtrl.navigateRoot('/login')
  }

  async continueRegistration(){
    if(!this.firstname || !this.middlename || !this.lastname || !this.year || !this.month || !this.day || !this.phone)
    {
      this.util.presentToast('bottom','Please fill all the fields completely.')
    }
    else{

      this.storage.set('firstname-register', this.firstname)
      this.storage.set('middlename-register', this.middlename)
      this.storage.set('lastname-register', this.lastname)
      this.storage.set('year-register', this.year)
      this.storage.set('month-register', this.month)
      this.storage.set('monthNum-register', this.monthNum)
      this.storage.set('day-register', this.day)
      this.storage.set('phone-register', this.phone)

      this.navCtrl.navigateForward('/registration-account')
    }
  }



}
