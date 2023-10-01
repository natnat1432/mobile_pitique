import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PitiquerViewPortfolioPage } from './pitiquer-view-portfolio.page';

const routes: Routes = [
  {
    path: '',
    component: PitiquerViewPortfolioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PitiquerViewPortfolioPageRoutingModule {}
