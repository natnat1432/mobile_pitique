import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PitiquerAddPackagePageRoutingModule } from './pitiquer-add-package-routing.module';

import { PitiquerAddPackagePage } from './pitiquer-add-package.page';

import { LoadingComponentModule } from 'src/app/components/loading/loading.module';

import { SidebarComponentModule } from 'src/app/components/sidebar/sidebar.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PitiquerAddPackagePageRoutingModule,
    LoadingComponentModule,
    SidebarComponentModule,
    ReactiveFormsModule
  ],
  declarations: [PitiquerAddPackagePage]
})
export class PitiquerAddPackagePageModule {}
