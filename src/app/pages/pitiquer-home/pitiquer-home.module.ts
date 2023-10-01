import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PitiquerHomePageRoutingModule } from './pitiquer-home-routing.module';

import { PitiquerHomePage } from './pitiquer-home.page';


import { SidebarComponentModule } from 'src/app/components/sidebar/sidebar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PitiquerHomePageRoutingModule,
    SidebarComponentModule
  ],
  declarations: [PitiquerHomePage]
})
export class PitiquerHomePageModule {}
