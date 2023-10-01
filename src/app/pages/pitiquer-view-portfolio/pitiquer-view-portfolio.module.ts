import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PitiquerViewPortfolioPageRoutingModule } from './pitiquer-view-portfolio-routing.module';

import { PitiquerViewPortfolioPage } from './pitiquer-view-portfolio.page';

import { SidebarComponentModule } from 'src/app/components/sidebar/sidebar.module';

import { LoadingComponentModule } from 'src/app/components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PitiquerViewPortfolioPageRoutingModule,
    SidebarComponentModule,
    LoadingComponentModule,
  ],
  declarations: [PitiquerViewPortfolioPage]
})
export class PitiquerViewPortfolioPageModule {}
