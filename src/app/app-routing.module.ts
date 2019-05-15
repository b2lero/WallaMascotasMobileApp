import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from '../pages/home/home.page';
import {AdoptPageComponent} from '../pages/adopt/adopt.page';
import {PetProfilePageComponent} from '../pages/adopt/pet-profile/pet-profile.page';
import {LoginPageComponent} from '../pages/auth/login/login.page';
import {HttpService} from '../core/http.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HomePageComponent.URL
  },
  {path: HomePageComponent.URL, loadChildren: '../pages/home/home.module#HomePageModule'},
  {path: AdoptPageComponent.URL, loadChildren: '../pages/adopt/adopt.module#AdoptPageModule'},
  {path: AdoptPageComponent.URL + '/' + PetProfilePageComponent.URL,
    loadChildren: '../pages/adopt/pet-profile/pet-profile.module#PetProfilePageModule'
  },
  { path: LoginPageComponent.URL, loadChildren: '../pages/auth/login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
  static COMPONENTS = [
      HomePageComponent,
      AdoptPageComponent,
      PetProfilePageComponent
  ];
}
