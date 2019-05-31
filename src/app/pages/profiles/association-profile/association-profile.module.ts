import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssociationProfilePage } from './association-profile.page';
import {CoreModule} from '../../../../core/core.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

const routes: Routes = [
  {
    path: '',
    component: AssociationProfilePage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        CoreModule,
        InfiniteScrollModule
    ],
  declarations: [AssociationProfilePage]
})
export class AssociationProfilePageModule {}
