import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from './pages/home/home.page';
import {AdoptPageComponent} from './pages/adopt/adopt.page';
import {LoginPageComponent} from './pages/auth/login/login.page';
import {SubmitPetPageComponent} from './pages/submit/submit-pet/submit-pet.page';
import {SubmitAsociationPageComponent} from './pages/submit/submit-asociation/submit-asociation.page';
import {SubmitServicePageComponent} from './pages/submit/submit-service/submit-service.page';
import {AssociationProfilePage} from './pages/profiles/association-profile/association-profile.page';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HomePageComponent.URL
  },
  {path: HomePageComponent.URL, loadChildren: './pages/home/home.module#HomePageModule'},
  {path: AdoptPageComponent.URL, loadChildren: './pages/adopt/adopt.module#AdoptPageModule'},
  {path: AdoptPageComponent.URL + '/:id' ,
    loadChildren: './pages/profiles/pet-profile/pet-profile.module#PetProfilePageModule'
  },
  { path: LoginPageComponent.URL, loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'submit/' + SubmitPetPageComponent.URL, loadChildren: './pages/submit/submit-pet/submit-pet.module#SubmitPetPageModule' },
  { path: 'submit/' + SubmitAsociationPageComponent.URL,
    loadChildren: './pages/submit/submit-asociation/submit-asociation.module#SubmitAsociationPageModule' },
  { path: 'submit/' + SubmitServicePageComponent.URL,
    loadChildren: './pages/submit/submit-service/submit-service.module#SubmitServicePageModule' },
  { path: 'associations' + '/:id', loadChildren: './pages/profiles/association-profile/association-profile.module#AssociationProfilePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
