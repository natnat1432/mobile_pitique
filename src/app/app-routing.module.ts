import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'registration-account',
    loadChildren: () => import('./pages/registration-account/registration-account.module').then( m => m.RegistrationAccountPageModule)
  },
  {
    path: 'realtor-home',
    loadChildren: () => import('./pages/realtor-home/realtor-home.module').then( m => m.RealtorHomePageModule)
  },
  {
    path: 'realtor-view-pitiquer',
    loadChildren: () => import('./pages/realtor-view-pitiquer/realtor-view-pitiquer.module').then( m => m.RealtorViewPitiquerPageModule)
  },
  {
    path: 'realtor-book-pitiquer-location',
    loadChildren: () => import('./pages/realtor-book-pitiquer-location/realtor-book-pitiquer-location.module').then( m => m.RealtorBookPitiquerLocationPageModule)
  },
  {
    path: 'pitiquer-home',
    loadChildren: () => import('./pages/pitiquer-home/pitiquer-home.module').then( m => m.PitiquerHomePageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },

  {
    path: 'pitiquer-view-portfolio',
    loadChildren: () => import('./pages/pitiquer-view-portfolio/pitiquer-view-portfolio.module').then( m => m.PitiquerViewPortfolioPageModule)
  },
  {
    path: 'pitiquer-view-packages',
    loadChildren: () => import('./pages/pitiquer-view-packages/pitiquer-view-packages.module').then( m => m.PitiquerViewPackagesPageModule)
  },
  {
    path: 'pitiquer-add-package',
    loadChildren: () => import('./pages/pitiquer-add-package/pitiquer-add-package.module').then( m => m.PitiquerAddPackagePageModule)
  },
  {
    path: 'pitiquer-view-package',
    loadChildren: () => import('./pages/pitiquer-view-package/pitiquer-view-package.module').then( m => m.PitiquerViewPackagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
