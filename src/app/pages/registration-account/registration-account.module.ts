import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationAccountPageRoutingModule } from './registration-account-routing.module';

import { RegistrationAccountPage } from './registration-account.page';

import { LoadingComponentModule } from 'src/app/components/loading/loading.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationAccountPageRoutingModule,
    LoadingComponentModule
  ],
  declarations: [RegistrationAccountPage],
  
})
export class RegistrationAccountPageModule {}
