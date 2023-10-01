import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealtorHomePage } from './realtor-home.page';

const routes: Routes = [
  {
    path: '',
    component: RealtorHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealtorHomePageRoutingModule {}
