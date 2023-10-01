import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealtorViewPitiquerPage } from './realtor-view-pitiquer.page';

const routes: Routes = [
  {
    path: '',
    component: RealtorViewPitiquerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealtorViewPitiquerPageRoutingModule {}
