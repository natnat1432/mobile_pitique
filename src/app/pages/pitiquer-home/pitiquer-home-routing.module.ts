import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PitiquerHomePage } from './pitiquer-home.page';

const routes: Routes = [
  {
    path: '',
    component: PitiquerHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PitiquerHomePageRoutingModule {}
