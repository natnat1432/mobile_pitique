import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PitiquerViewPackagePageRoutingModule } from './pitiquer-view-package-routing.module';

import { PitiquerViewPackagePage } from './pitiquer-view-package.page';

import { SidebarComponentModule } from 'src/app/components/sidebar/sidebar.module';

import { LoadingComponentModule } from 'src/app/components/loading/loading.module';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PitiquerViewPackagePageRoutingModule,
    SidebarComponentModule,
    LoadingComponentModule,
    ReactiveFormsModule,
  ],
  declarations: [PitiquerViewPackagePage]
})
export class PitiquerViewPackagePageModule {}
