import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PitiquerAddPackagePage } from './pitiquer-add-package.page';

const routes: Routes = [
  {
    path: '',
    component: PitiquerAddPackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PitiquerAddPackagePageRoutingModule {}
