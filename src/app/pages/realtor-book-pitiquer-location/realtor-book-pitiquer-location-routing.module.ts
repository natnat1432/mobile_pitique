import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealtorBookPitiquerLocationPage } from './realtor-book-pitiquer-location.page';

const routes: Routes = [
  {
    path: '',
    component: RealtorBookPitiquerLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealtorBookPitiquerLocationPageRoutingModule {}
