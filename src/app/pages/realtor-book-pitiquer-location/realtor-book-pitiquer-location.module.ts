import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealtorBookPitiquerLocationPageRoutingModule } from './realtor-book-pitiquer-location-routing.module';

import { RealtorBookPitiquerLocationPage } from './realtor-book-pitiquer-location.page';
import { ReactiveFormsModule } from '@angular/forms';

import { LoadingComponentModule } from 'src/app/components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealtorBookPitiquerLocationPageRoutingModule,
    ReactiveFormsModule,
    LoadingComponentModule
  ],
  declarations: [RealtorBookPitiquerLocationPage]
})
export class RealtorBookPitiquerLocationPageModule {}
