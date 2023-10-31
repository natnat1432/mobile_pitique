import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SessionService } from 'src/app/services/session.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-realtor-book-pitiquer-location',
  templateUrl: './realtor-book-pitiquer-location.page.html',
  styleUrls: ['./realtor-book-pitiquer-location.page.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        }),
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({
          transform: 'translateX(-100%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class RealtorBookPitiquerLocationPage implements OnInit {
  form_location:boolean = true
  form_services:boolean = false
  form_schedule:boolean = false
  form_contact:boolean = false
  form_review:boolean = false
  isLoading:boolean = false

  formLocation = new FormGroup({
    book_streetname:new FormControl(""),
    book_unitno:new FormControl(""),
    book_city:new FormControl("", Validators.required),
    book_province:new FormControl("", Validators.required),
    book_postal:new FormControl("", Validators.required),
    book_propertysize:new FormControl(""),
    book_notes:new FormControl("")
  })

  formServices = new FormGroup({
    book_totalfee: new FormControl(0, Validators.required),
    pkg_id:new FormControl(null, Validators.required),
    pkg_name:new FormControl("", Validators.required)
  })

  formSchedule = new FormGroup({
    book_date : new FormControl(null, Validators.required)
  })
  formContact = new FormGroup({
    book_firstname: new FormControl('', Validators.required),
    book_lastname : new FormControl('', Validators.required),
    book_email:new FormControl(''),
    book_phone:new FormControl('', Validators.required),
    book_company: new FormControl(''),
  })


  isChecked: boolean = false;
  ptqr_id:any

  packages:any
  totalPackageFee:number = 0;
  serverAPI = environment.serverAPI
  constructor(
    private session:SessionService,
    private activatedRoute:ActivatedRoute,
    private storage:StorageService,
    private http:HttpClient,
    private navCtrl:NavController,
    private util:UtilService,
  ) {
    this.activatedRoute.paramMap.subscribe((data:any) => {
      this.ptqr_id = data.params["ptqr_id"]
    })
   }
  
  async ngOnInit() {
    await this.session.checkSession()
    console.log("Ptiqer id", this.ptqr_id)
    await this.getPackages()
  }


  toggleFormLocation(){
    this.form_location = true
    this.form_services = false
    this.form_schedule = false
    this.form_contact = false
    this.form_review = false

  }


  toggleFormServices(){
    this.form_location = false
    this.form_services = true
    this.form_schedule = false
    this.form_contact = false
    this.form_review = false
    console.log(this.formLocation.value)
  }

  toggleFormSchedule(){
    this.form_location = false
    this.form_services = false
    this.form_schedule = true
    this.form_contact = false
    this.form_review = false
    console.log(this.formServices.value)
  }
  toggleFormContact(){
    this.form_location = false
    this.form_services = false
    this.form_schedule = false
    this.form_contact = true
    this.form_review = false
    console.log(this.formSchedule.value)
  }
  toggleFormReview(){
    this.form_location = false
    this.form_services = false
    this.form_schedule = false
    this.form_contact = false
    this.form_review = true
    console.log(this.formContact.value)
  }
  async getPackages(){
    const accessToken = await this.storage.get("accessToken")
    const id = this.ptqr_id

    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }
    this.http.get(`${this.serverAPI}/api/pitiquer/package/${id}`, options).subscribe(
      (response:any)=>{
  
        this.packages = response
        this.packages.map((item:any) => {
          item["selected"] = false
        })
        console.log(this.packages)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  
  viewPitiquer(ptqr_id:number){
    this.navCtrl.navigateBack(['/realtor-view-pitiquer',{
    ptqr_id:ptqr_id
    }])
  }
  toggleSelectPackages(index:number){
    this.formServices.patchValue({
      book_totalfee:Number(this.packages[index].pkg_min_price),
      pkg_name: this.packages[index].pkg_name
    })
    this.totalPackageFee = Number(this.packages[index].pkg_min_price)
  }

  async submitRequest(){
    this.isLoading = true
    const rltr_id = await this.storage.get("id")
    const book_fee = Number(this.formServices.value.book_totalfee)
    const book_share = Number((book_fee * 0.1).toFixed(2));
    const formData = {
      pkg_id : this.formServices.value.pkg_id,
      rltr_id : rltr_id,
      ptqr_id : this.ptqr_id,
      book_status : "pending",
      book_fee : book_fee,
      book_share : book_share,
      book_date: this.formSchedule.value.book_date,
      book_streetname: this.formLocation.value.book_streetname,
      book_unitno : this.formLocation.value.book_unitno,
      book_city : this.formLocation.value.book_city,
      book_province : this.formLocation.value.book_province,
      book_postal : this.formLocation.value.book_postal,
      book_propertysize : this.formLocation.value.book_propertysize,
      book_notes : this.formLocation.value.book_notes,
      book_firstname : this.formContact.value.book_firstname,
      book_lastname : this.formContact.value.book_lastname,
      book_email : this.formContact.value.book_email,
      book_phone : this.formContact.value.book_phone,
      book_company : this.formContact.value.book_company
    }

    console.log("FORM DATA", formData)

    const accessToken = await this.storage.get("accessToken")

    const options = {
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }

    const response = this.http.post(`${this.serverAPI}/api/realtor/book`, formData, options).toPromise()
    const loadingPromise = new Promise((resolve) => setTimeout(resolve, environment.loadingtime))

    return await Promise.all([response,loadingPromise])
      .then(
        (response:any) => {
          console.log(response)
          this.util.presentAlert("Book Success","","You have successfully booked a pitiquer. Please wait while the pitiquer reviews your request")
          this.navCtrl.navigateRoot(["realtor-home"])
        },
        (error) => {
          console.log(error)
          this.util.presentToast("bottom", "Error booking pitiquer. Please try again later")
        }
      )

  }

}
