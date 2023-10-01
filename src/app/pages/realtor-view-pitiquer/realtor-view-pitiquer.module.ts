import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealtorViewPitiquerPageRoutingModule } from './realtor-view-pitiquer-routing.module';

import { RealtorViewPitiquerPage } from './realtor-view-pitiquer.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealtorViewPitiquerPageRoutingModule
  ],
  declarations: [RealtorViewPitiquerPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class RealtorViewPitiquerPageModule {}
