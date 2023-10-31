import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PitiquerViewPackagePage } from './pitiquer-view-package.page';

const routes: Routes = [
  {
    path: '',
    component: PitiquerViewPackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PitiquerViewPackagePageRoutingModule {}
