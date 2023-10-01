import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PitiquerViewPackagesPage } from './pitiquer-view-packages.page';

const routes: Routes = [
  {
    path: '',
    component: PitiquerViewPackagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PitiquerViewPackagesPageRoutingModule {}
