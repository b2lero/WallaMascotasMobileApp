import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssociationsPage } from './associations.page';
import {CoreModule} from '../../../core/core.module';

const routes: Routes = [
  {
    path: '',
    component: AssociationsPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        CoreModule
    ],
  declarations: [AssociationsPage]
})
export class AssociationsPageModule {}
