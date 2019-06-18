import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {HomePage} from './pages/home/home.page';
import {AdoptPage} from './pages/adopt/adopt.page';
import {PetProfilePage} from './pages/profiles/pet-profile/pet-profile.page';
import {LoginPage} from './pages/auth/login/login.page';
import {SubmitPetPage} from './pages/submit/submit-pet/submit-pet.page';
import {SubmitAsociationPage} from './pages/submit/submit-asociation/submit-asociation.page';
import {SubmitServicePage} from './pages/submit/submit-service/submit-service.page';
import {AssociationsPage} from './pages/associations/associations.page';
import {HttpService} from '../core/http.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HomePage.URL
  },
  {path: HomePage.URL, loadChildren: './pages/home/home.module#HomePageModule'},
  {path: AdoptPage.URL, loadChildren: './pages/adopt/adopt.module#AdoptPageModule'},
  {path: AdoptPage.URL + '/' + ':id' ,
    loadChildren: './pages/profiles/pet-profile/pet-profile.module#PetProfilePageModule'
  },
  { path: LoginPage.URL, loadChildren: './pages/auth/login/login.module#LoginPageModule'},
  { path: 'submit/' + SubmitPetPage.URL, loadChildren: './pages/submit/submit-pet/submit-pet.module#SubmitPetPageModule',
  // TODO add canactivate
  },
  { path: 'submit/' + SubmitAsociationPage.URL,
    loadChildren: './pages/submit/submit-asociation/submit-asociation.module#SubmitAsociationPageModule',
    canActivate: [HttpService]
  },
  { path: 'submit/' + SubmitServicePage.URL,
    loadChildren: './pages/submit/submit-service/submit-service.module#SubmitServicePageModule',
    canActivate: [HttpService]
  }
    ,
  { path: AssociationsPage.URL, loadChildren: './pages/associations/associations.module#AssociationsPageModule' },
  { path: AssociationsPage.URL + '/' + ':id', loadChildren: './pages/profiles/association-profile/association-profile.module#AssociationProfilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
