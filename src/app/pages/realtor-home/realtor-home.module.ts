import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealtorHomePageRoutingModule } from './realtor-home-routing.module';

import { RealtorHomePage } from './realtor-home.page';


import { SidebarComponentModule } from 'src/app/components/sidebar/sidebar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealtorHomePageRoutingModule,
    SidebarComponentModule
  ],
  declarations: [RealtorHomePage]
})
export class RealtorHomePageModule {}
