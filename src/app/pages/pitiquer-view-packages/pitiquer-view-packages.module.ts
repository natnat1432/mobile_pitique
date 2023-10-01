import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PitiquerViewPackagesPageRoutingModule } from './pitiquer-view-packages-routing.module';

import { PitiquerViewPackagesPage } from './pitiquer-view-packages.page';

import { SidebarComponentModule } from 'src/app/components/sidebar/sidebar.module';

import { LoadingComponentModule } from 'src/app/components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PitiquerViewPackagesPageRoutingModule,
    SidebarComponentModule,
    LoadingComponentModule,
  ],
  declarations: [PitiquerViewPackagesPage]
})
export class PitiquerViewPackagesPageModule {}
