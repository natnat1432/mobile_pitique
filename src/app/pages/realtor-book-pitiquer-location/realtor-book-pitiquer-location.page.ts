import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SessionService } from 'src/app/services/session.service';
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

  street_name:string = ''
  unit_no:string = ''
  city:string = ''
  province:string = ''
  postal_code:string = ''
  property_size:string = ''
  notes_pitiquer:string = ''

  isChecked: boolean = false;



  constructor(
    private session:SessionService,
  ) { }
  
  async ngOnInit() {
    await this.session.checkSession()
  }

  toggleFormLocationNext(){
    this.form_location = !this.form_location
    console.log('form location',this.form_location)
  }
  toggleFormLocation(){
    this.form_location = true
    this.form_services = false
    this.form_schedule = false
    this.form_contact = false
    this.form_review = false
  }

  toggleFormServicesNext(){

  }
  toggleFormServices(){
    
  }

}
