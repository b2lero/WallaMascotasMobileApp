import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from '../pages/home/home.page';
import {AdoptPageComponent} from '../pages/adopt/adopt.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HomePageComponent.URL
  },
  {path: HomePageComponent.URL, loadChildren: '../pages/home/home.module#HomePageModule'},
  {path: AdoptPageComponent.URL, loadChildren: '../pages/adopt/adopt.module#AdoptPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
  static COMPONENTS = [
      HomePageComponent
  ];
}
